import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Wallet, RefreshCw, Clock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/selg")({
  head: () => ({
    meta: [
      { title: "Selg bilen din i Sandefjord – Auto Globe AS i Torp" },
      { name: "description", content: "Få et uforpliktende tilbud på bilen din. Auto Globe AS i Torp, Fredrikstad kjøper biler direkte fra privatpersoner, og tilbyr innbytte." },
      { property: "og:title", content: "Selg bilen din i Sandefjord – Auto Globe AS" },
      { property: "og:description", content: "Rask og enkel prosess. Få et uforpliktende tilbud på bilen din." },
      { property: "og:url", content: "https://autoglobe.no/selg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://autoglobe.no/selg" }],
  }),
  component: SellPage,
});

const steps = [
  { icon: Clock, title: "Send inn skjemaet", body: "Fyll ut regnr, kilometerstand og kontaktinfo. Det tar under ett minutt." },
  { icon: Wallet, title: "Motta et tilbud", body: "Vi vurderer bilen og kontakter deg raskt med et markedsriktig tilbud." },
  { icon: RefreshCw, title: "Levering eller innbytte", body: "Selg direkte til oss, eller bytt inn i en ny bil fra vårt utvalg." },
];

function SellPage() {
  return (
    <>
      <Navbar />
      <main className="section-top pb-24 md:pb-36">
        <div className="container-page">
          <div className="grid gap-16 lg:gap-20 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">Selg eller bytt inn</p>
              <h1 className="mt-5 text-[44px] sm:text-6xl md:text-[72px] font-semibold tracking-[-0.035em] leading-[1.02]">
                Hva er bilen din verdt?
              </h1>
              <p className="mt-7 text-lg md:text-xl text-muted-foreground leading-[1.75] max-w-[54ch]">
                Vi kjøper biler av alle merker og modeller. Fyll ut skjemaet så
                kontakter vi deg raskt med et uforpliktende og markedsriktig tilbud.
              </p>

              <ol className="mt-14 space-y-10">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-brand/[0.07] text-brand flex items-center justify-center shrink-0">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <div className="pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Steg {i + 1}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{s.title}</h2>
                      <p className="mt-2.5 text-muted-foreground leading-[1.75] max-w-[48ch]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-14 flex items-center gap-3 border-t border-hairline pt-8 text-[15px] text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-brand shrink-0" />
                Trygg handel med profesjonelt oppgjør og rask utbetaling.
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6 lg:sticky lg:top-32">
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
