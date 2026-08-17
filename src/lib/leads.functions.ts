import { createServerFn } from "@tanstack/react-start";
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

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { storeLead, emailLead } = await import("./leads.server");
    const lead = { ...data, email: data.email || undefined };
    await storeLead(lead);
    const emailed = await emailLead(lead);
    return { ok: true, emailed };
  });
