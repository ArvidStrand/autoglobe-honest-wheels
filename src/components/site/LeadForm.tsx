import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "hero" | "panel";

export function LeadForm({ variant = "hero" }: { variant?: Variant }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ reg: "", km: "", name: "", phone: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const wrapClass = cn(
    "rounded-2xl p-6 sm:p-8 md:p-10",
    variant === "hero"
      ? "bg-background shadow-lift border border-hairline"
      : "bg-secondary/60 border border-hairline",
  );

  if (submitted) {
    return (
      <div className={wrapClass}>
        <div className="flex flex-col items-center text-center py-6">
          <CheckCircle2 className="h-12 w-12 text-brand" />
          <h3 className="mt-4 text-2xl font-semibold">Takk, {form.name || "vi kontakter deg"}!</h3>
          <p className="mt-3 text-muted-foreground max-w-md">
            Vi har mottatt henvendelsen din på {form.reg?.toUpperCase() || "bilen din"} og
            kontakter deg på {form.phone || "telefon"} innen kort tid med et uforpliktende tilbud.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={wrapClass}>
      <div className="grid gap-4 sm:grid-cols-2">
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

      <button
        type="submit"
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:shadow-md"
      >
        Få tilbud
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-xs text-muted-foreground text-center">
        Uforpliktende og gratis. Vi kontakter deg innen 24 timer på hverdager.
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
      <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition",
          uppercase && "tracking-widest font-medium",
        )}
      />
    </label>
  );
}
