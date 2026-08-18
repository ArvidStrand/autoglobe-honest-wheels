import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const leadSchema = z.object({
  reg: z.string().trim().min(2).max(15),
  km: z.string().trim().max(20).default(""),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional(),
  source: z.string().trim().max(50).optional(),
});

const RECIPIENT = "post@autoglobe.no";
const FROM = "Auto Globe AS <nettside@autoglobe.no>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...corsHeaders },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend(apiKey: string, from: string, payload: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ ...payload, from }),
  });
}

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = leadSchema.parse(await request.json());
        } catch {
          return json({ ok: false, error: "invalid_input" }, 400);
        }

        const lead = { ...parsed, email: parsed.email || undefined };

        // Store the lead (best effort — email delivery is the critical path).
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("leads").insert({
            reg: lead.reg,
            km: lead.km,
            name: lead.name,
            phone: lead.phone,
            email: lead.email ?? null,
            message: lead.message ?? null,
            source: lead.source ?? "verdivurdering",
          });
          if (error) console.error("Kunne ikke lagre henvendelse:", error.message);
        } catch (err) {
          console.error("Kunne ikke lagre henvendelse:", err);
        }

        const apiKey = process.env["RESEND_API_KEY"];
        if (!apiKey) {
          console.error("RESEND_API_KEY mangler");
          return json({ ok: false, error: "email_not_configured" }, 500);
        }

        const rows: Array<[string, string]> = [
          ["Registreringsnummer", lead.reg.toUpperCase()],
          ["Kilometerstand", lead.km || "—"],
          ["Navn", lead.name],
          ["Telefon", lead.phone],
        ];
        if (lead.email) rows.push(["E-post", lead.email]);
        if (lead.message) rows.push(["Melding", lead.message]);

        const text = `Ny forespørsel om verdivurdering\n\n${rows
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")}`;
        const html = `<div style="font-family:Helvetica,Arial,sans-serif;color:#111">
    <h2 style="margin:0 0 16px">Ny forespørsel om verdivurdering</h2>
    <table style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#666">${k}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
  </div>`;

        const payload = {
          to: [RECIPIENT],
          subject: `Ny henvendelse: ${lead.reg.toUpperCase()} – ${lead.name}`,
          html,
          text,
          ...(lead.email ? { reply_to: lead.email } : {}),
        };

        const response = await sendViaResend(apiKey, FROM, payload);
        if (!response.ok) {
          const body = await response.text();
          console.error(`Resend feilet [${response.status}]: ${body}`);
          return json({ ok: false, error: "email_failed" }, 502);
        }

        const result = (await response.json()) as { id?: string };
        return json({ ok: true, emailId: result.id ?? null });
      },
    },
  },
});
