import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Auto Globe AS" },
      { name: "description", content: "Kontakt Auto Globe AS. Ring, send e-post eller kom innom oss i Sulfatveien 29, Torp." },
      { property: "og:title", content: "Kontakt – Auto Globe AS" },
      { property: "og:description", content: "Ring, send e-post eller besøk oss i Torp." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-brand font-medium">Kontakt</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">Ta kontakt</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Vi svarer raskt på henvendelser og tar imot besøk uten timeavtale.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-6">
              <Info icon={Phone} title="Telefon" value={company.phone} href={company.phoneHref} />
              <Info icon={Mail} title="E-post" value={company.email} href={`mailto:${company.email}`} />
              <Info icon={MapPin} title="Adresse" value={`${company.address.street}, ${company.address.zip} ${company.address.city}`} />
              <div className="rounded-2xl border border-hairline p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand" />
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Åpningstider</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {company.hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-foreground">
                      <span>{h.day}</span><span className="text-muted-foreground">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
              <div className="mt-10 aspect-[4/3] rounded-2xl overflow-hidden border border-hairline">
                <iframe
                  title="Kart"
                  src={`https://www.google.com/maps?q=${company.mapsQuery}&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Info({ icon: Icon, title, value, href }: { icon: any; title: string; value: string; href?: string }) {
  const Wrap = (href ? "a" : "div") as any;
  return (
    <Wrap href={href} className={cn("flex items-start gap-4 rounded-2xl border border-hairline p-6", href && "hover:bg-accent transition-colors")}>
      <div className="h-10 w-10 rounded-md bg-brand/10 text-brand flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
        <p className="mt-1 text-lg font-medium text-foreground">{value}</p>
      </div>
    </Wrap>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="rounded-2xl border border-hairline p-8 bg-secondary/40">
        <h3 className="text-2xl font-semibold">Takk for meldingen!</h3>
        <p className="mt-3 text-muted-foreground">Vi svarer deg innen kort tid.</p>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="rounded-2xl border border-hairline p-6 sm:p-8 bg-background"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Navn" required />
        <Input label="Telefon" type="tel" required />
        <div className="sm:col-span-2"><Input label="E-post" type="email" required /></div>
        <div className="sm:col-span-2">
          <label className="block">
            <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">Melding</span>
            <textarea
              rows={5}
              required
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              placeholder="Hva kan vi hjelpe deg med?"
            />
          </label>
        </div>
      </div>
      <button className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform">
        Send melding
      </button>
    </form>
  );
}

function Input({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      <input
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}
