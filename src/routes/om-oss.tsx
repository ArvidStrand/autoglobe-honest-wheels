import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { company } from "@/lib/company";
import gl350 from "@/assets/gl350.asset.json";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss – Auto Globe AS" },
      { name: "description", content: "Auto Globe AS er en lokal bruktbilforhandler i Torp med mange års erfaring og fokus på ærlig kundebehandling." },
      { property: "og:title", content: "Om oss – Auto Globe AS" },
      { property: "og:description", content: "Lokal bruktbilforhandler i Torp med fokus på ærlig service." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-brand font-medium">Om Auto Globe AS</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
              Lokal bruktbilforhandler med et enkelt løfte: ærlighet.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Auto Globe AS drives fra Sulfatveien 29 i Torp. Vi har mange års erfaring
              fra bilbransjen, og har spesialisert oss på rimelige bruktbiler av god kvalitet.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-hairline shadow-card">
              <img src={gl350.url} alt="Auto Globe AS – bruktbil" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                Vi tror på personlig og direkte kundekontakt. Når du kommer innom oss,
                møter du eier <span className="text-foreground font-medium">{company.owner}</span> — ikke en avdeling.
              </p>
              <p>
                Alle bilene vi selger er nøye kontrollert. Vi tilbyr finansiering,
                innbytte og bruktbilgaranti, og kjøper også biler direkte fra privatpersoner.
              </p>
              <p>
                Målet vårt er enkelt: du skal føle deg trygg fra første telefonsamtale
                til nøkkelen ligger i hånden din.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-3 border-t border-hairline pt-12">
            <Value title="Ærlighet" body="Vi selger bilene slik de er. Ingen skjulte overraskelser." />
            <Value title="Kvalitet" body="Nøye utvalgte biler som er kontrollert før levering." />
            <Value title="Personlig service" body="Direkte kontakt med eier — hele veien." />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Value({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
