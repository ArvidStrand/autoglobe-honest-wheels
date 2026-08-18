import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt Auto Globe AS – bilforhandler i Torp, Fredrikstad" },
      { name: "description", content: "Kontakt Auto Globe AS i Sulfatveien 29, 1658 Torp i Fredrikstad. Ring 984 06 472, send e-post til post@autoglobe.no eller kom innom." },
      { property: "og:title", content: "Kontakt Auto Globe AS – bilforhandler i Torp, Fredrikstad" },
      { property: "og:description", content: "Ring 984 06 472, send e-post eller besøk oss i Sulfatveien 29, Torp." },
      { property: "og:url", content: "https://autoglobe.no/kontakt" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://autoglobe.no/kontakt" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="section-top pb-24 md:pb-36">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Kontakt</p>
            <h1 className="mt-5 text-[44px] sm:text-6xl md:text-[72px] font-semibold tracking-[-0.035em] leading-[1.02]">
              Ta kontakt
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-[1.75] max-w-[54ch]">
              Vi svarer raskt på henvendelser og tar imot besøk uten timeavtale.
            </p>
          </Reveal>

          <div className="mt-16 md:mt-24 grid gap-10 lg:gap-14 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-5 space-y-5">
              <a
                href={company.phoneHref}
                className="group block rounded-3xl bg-foreground p-8 text-background transition-transform duration-[250ms] hover:-translate-y-1"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-background/60">
                  Ring oss direkte
                </p>
                <p className="mt-3 flex items-center gap-3 text-[32px] md:text-[38px] font-semibold tracking-[-0.03em] leading-none">
                  <Phone className="h-6 w-6 text-brand" />
                  {company.phone}
                </p>
              </a>

              <Info icon={Mail} title="E-post" value={company.email} href={`mailto:${company.email}`} />
              <Info icon={MapPin} title="Adresse" value={`${company.address.street}, ${company.address.zip} ${company.address.city}, ${company.address.municipality}`} />

              <div className="surface-card p-8">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand" />
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Åpningstider
                  </h2>
                </div>
                <ul className="mt-6 space-y-3.5">
                  {company.hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-[17px] text-foreground">
                      <span>{h.day}</span><span className="text-muted-foreground">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <ContactForm />
              <div className="mt-10 relative overflow-hidden rounded-[28px] border border-hairline shadow-float h-[420px] md:h-[520px] bg-muted">
                <iframe
                  title="Kart"
                  src={`https://www.google.com/maps?q=${company.mapsQuery}&output=embed`}
                  className="h-full w-full grayscale-[0.85] contrast-[1.05] transition-[filter] duration-500 hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            </Reveal>
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
    <Wrap
      href={href}
      className={cn(
        "flex items-start gap-5 surface-card p-8 transition-[transform,box-shadow] duration-[250ms]",
        href && "hover:-translate-y-1 hover:shadow-float",
      )}
    >
      <div className="h-12 w-12 rounded-2xl bg-brand/[0.07] text-brand flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</p>
        <p className="mt-1.5 text-lg font-medium text-foreground leading-relaxed">{value}</p>
      </div>
    </Wrap>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="surface-card p-10 bg-secondary/50">
        <h2 className="text-3xl font-semibold tracking-tight">Takk for meldingen!</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">Vi svarer deg innen kort tid.</p>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="rounded-[28px] border border-hairline bg-background shadow-soft p-8 sm:p-10"
    >
      <h2 className="text-2xl font-semibold tracking-tight">Send oss en melding</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Input label="Navn" required />
        <Input label="Telefon" type="tel" required />
        <div className="sm:col-span-2"><Input label="E-post" type="email" required /></div>
        <div className="sm:col-span-2">
          <label className="block">
            <span className="field-label">Melding</span>
            <textarea
              rows={5}
              required
              className="field-input resize-y"
              placeholder="Hva kan vi hjelpe deg med?"
            />
          </label>
        </div>
      </div>
      <button className="btn btn-dark btn-lg mt-8 w-full sm:w-auto">
        Send melding
      </button>
    </form>
  );
}

function Input({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input type={type} required={required} className="field-input" />
    </label>
  );
}
