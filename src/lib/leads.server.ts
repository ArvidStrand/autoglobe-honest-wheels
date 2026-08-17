import { sendLovableEmail } from "@lovable.dev/email-js";

export interface LeadInput {
  reg: string;
  km: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
}

const RECIPIENT = "post@autoglobe.no";
const SENDER = "Auto Globe AS <post@autoglobe.no>";

export async function storeLead(input: LeadInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("leads").insert({
    reg: input.reg,
    km: input.km,
    name: input.name,
    phone: input.phone,
    email: input.email ?? null,
    message: input.message ?? null,
    source: input.source ?? "verdivurdering",
  });
  if (error) throw new Error(error.message);
}

export async function emailLead(input: LeadInput): Promise<boolean> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return false;

  const rows: Array<[string, string]> = [
    ["Registreringsnummer", input.reg],
    ["Kilometerstand", input.km],
    ["Navn", input.name],
    ["Telefon", input.phone],
  ];
  if (input.email) rows.push(["E-post", input.email]);
  if (input.message) rows.push(["Melding", input.message]);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;color:#111">
    <h2 style="margin:0 0 16px">Ny verdivurdering fra nettsiden</h2>
    <table style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#666">${k}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
  </div>`;

  try {
    await sendLovableEmail(
      {
        to: RECIPIENT,
        from: SENDER,
        subject: `Ny henvendelse: ${input.reg.toUpperCase()} – ${input.name}`,
        html,
        text,
        purpose: "lead-notification",
        ...(input.email ? { reply_to: input.email } : {}),
      },
      { apiKey },
    );
    return true;
  } catch (err) {
    console.error("Kunne ikke sende e-post om ny henvendelse:", err);
    return false;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
