import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/leads.functions";

type Variant = "hero" | "panel";

export function LeadForm({ variant = "hero" }: { variant?: Variant }) {
  const send = useServerFn(submitLead);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ reg: "", km: "", name: "", phone: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await send({ data: { ...form, source: "verdivurdering" } });
      setSubmitted(true);
    } catch {
      setError("Noe gikk galt. Prøv igjen, eller ring oss direkte.");
    } finally {
      setLoading(false);
    }
  };

  const wrapClass = cn(
    "rounded-[28px]",
    variant === "hero"
      ? "bg-background border border-hairline shadow-float p-7 sm:p-10 md:p-12"
      : "bg-secondary/60 border border-hairline p-6 sm:p-8",
  );

  if (submitted) {
    return (
      <div className={wrapClass}>
        <div className="flex flex-col items-center text-center py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
            <CheckCircle2 className="h-8 w-8 text-brand" />
          </div>
          <h3 className="mt-6 text-3xl font-semibold tracking-tight">
            Takk, {form.name || "vi tar kontakt med deg snart"}!
          </h3>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">
            Vi har mottatt henvendelsen din på {form.reg?.toUpperCase() || "bilen din"} og
            kontakter deg på {form.phone || "telefon"} snart med et uforpliktende tilbud.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={wrapClass}>
      {variant === "hero" && (
        <div className="mb-8">
          <p className="eyebrow">Gratis verdivurdering</p>
          <h2 className="mt-3 text-[26px] sm:text-3xl font-semibold tracking-tight">
            Få tilbud på bilen din
          </h2>
          <p className="mt-2.5 text-[15px] text-muted-foreground leading-relaxed">
            Fyll ut skjemaet — det tar under ett minutt.
          </p>
        </div>
      )}

      <div className={cn("grid sm:grid-cols-2", variant === "hero" ? "gap-6" : "gap-4")}>
        <Field
          label="Registreringsnummer"
          placeholder="AB 12345"
          value={form.reg}
          onChange={(v) => setForm({ ...form, reg: v.toUpperCase() })}
          uppercase
          required
        />
        <Field
          label="Kilometerstand"
          placeholder="120 000"
          value={form.km}
          onChange={(v) => setForm({ ...form, km: v.replace(/[^\d ]/g, "") })}
          inputMode="numeric"
          required
        />
        <Field
          label="Navn"
          placeholder="Ditt fulle navn"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          required
        />
        <Field
          label="Telefon"
          placeholder="+47 900 00 000"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
          type="tel"
          required
        />
      </div>

      {error && (
        <p className="mt-5 rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-[14px] text-brand">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "btn btn-brand w-full disabled:opacity-70",
          variant === "hero" ? "btn-lg mt-8" : "mt-6",
        )}
      >
        {loading ? "Sender…" : "Få tilbud"}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </button>

      <p className="mt-5 flex items-center justify-center gap-2 text-[13px] text-muted-foreground text-center">
        <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
        Uforpliktende og gratis. Svar innen 24 timer på hverdager.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  inputMode,
  uppercase,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  inputMode?: "text" | "numeric" | "tel";
  uppercase?: boolean;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className={cn("field-input", uppercase && "tracking-[0.12em] font-medium")}
      />
    </label>
  );
}
