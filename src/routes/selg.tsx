import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Wallet, RefreshCw, Clock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/selg")({
  head: () => ({
    meta: [
      { title: "Selg bilen din – Auto Globe AS" },
      { name: "description", content: "Få et uforpliktende tilbud på bilen din. Auto Globe AS kjøper biler direkte fra privatpersoner." },
      { property: "og:title", content: "Selg bilen din – Auto Globe AS" },
      { property: "og:description", content: "Rask og enkel prosess. Få et uforpliktende tilbud på bilen din." },
    ],
  }),
  component: SellPage,
});

const steps = [
  { icon: Clock, title: "1. Send inn skjemaet", body: "Fyll ut regnr, kilometerstand og kontaktinfo. Det tar under ett minutt." },
  { icon: Wallet, title: "2. Motta et tilbud", body: "Vi vurderer bilen og kontakter deg raskt med et markedsriktig tilbud." },
  { icon: RefreshCw, title: "3. Levering eller innbytte", body: "Selg direkte til oss, eller bytt inn i en ny bil fra vårt utvalg." },
];

function SellPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <p className="text-xs uppercase tracking-widest text-brand font-medium">Selg eller bytt inn</p>
              <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
                Hva er bilen din verdt?
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Vi kjøper biler av alle merker og modeller. Fyll ut skjemaet så
                kontakter vi deg raskt med et uforpliktende og markedsriktig tilbud.
              </p>

              <ul className="mt-10 space-y-6">
                {steps.map((s) => (
                  <li key={s.title} className="flex gap-5">
                    <div className="h-11 w-11 rounded-md bg-brand/10 text-brand flex items-center justify-center shrink-0">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                      <p className="mt-1 text-muted-foreground">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-brand" />
                Trygg handel med profesjonelt oppgjør og rask utbetaling.
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
