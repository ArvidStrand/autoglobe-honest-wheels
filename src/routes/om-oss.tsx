import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
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
      <main className="section-top pb-24 md:pb-36">
        <div className="container-page">
          <Reveal className="max-w-4xl">
            <p className="eyebrow">Om Auto Globe AS</p>
            <h1 className="mt-5 text-[40px] sm:text-6xl md:text-[68px] font-semibold tracking-[-0.035em] leading-[1.04]">
              Lokal bruktbilforhandler med et enkelt løfte: ærlighet.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-[1.8] max-w-[58ch]">
              Auto Globe AS drives fra Sulfatveien 29 i Torp. Vi har mange års erfaring
              fra bilbransjen, og har spesialisert oss på rimelige bruktbiler av god kvalitet.
            </p>
          </Reveal>

          <div className="mt-20 md:mt-28 grid gap-14 lg:gap-20 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="aspect-[4/3] overflow-hidden rounded-[28px] border border-hairline shadow-float">
                <img
                  src={gl350.url}
                  alt="Auto Globe AS – bruktbil"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal delay={120} className="space-y-7 text-lg text-muted-foreground leading-[1.8] max-w-[54ch]">
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
            </Reveal>
          </div>

          <div className="mt-24 md:mt-32 grid gap-12 md:gap-10 sm:grid-cols-3 border-t border-hairline pt-16">
            <Value index="01" title="Ærlighet" body="Vi selger bilene slik de er. Ingen skjulte overraskelser." />
            <Value index="02" title="Kvalitet" body="Nøye utvalgte biler som er kontrollert før levering." />
            <Value index="03" title="Personlig service" body="Direkte kontakt med eier — hele veien." />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Value({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <Reveal>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">{index}</p>
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-muted-foreground leading-[1.75] max-w-[36ch]">{body}</p>
    </Reveal>
  );
}
