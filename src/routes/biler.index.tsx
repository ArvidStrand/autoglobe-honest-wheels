import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CarCard } from "@/components/site/CarCard";
import { Reveal } from "@/components/site/Reveal";
import { cars } from "@/lib/cars";
import {
  fetchFinnListings,
  formatFinnKm,
  formatFinnPrice,
  type FinnListing,
} from "@/lib/finn";


export const Route = createFileRoute("/biler/")({
  head: () => ({
    meta: [
      { title: "Våre biler – Auto Globe AS" },
      { name: "description", content: "Se alle våre kvalitetssikrede bruktbiler til salgs hos Auto Globe AS i Torp." },
      { property: "og:title", content: "Våre biler – Auto Globe AS" },
      { property: "og:description", content: "Utvalg av bruktbiler til salgs hos Auto Globe AS i Torp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  const finnListings: FinnListing[] = [];

  return (
    <>
      <Navbar />
      <main className="section-top pb-24 md:pb-36">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Bilutvalg</p>
            <h1 className="mt-5 text-[44px] sm:text-6xl md:text-[72px] font-semibold tracking-[-0.035em] leading-[1.02]">
              Våre biler
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-[1.75] max-w-[54ch]">
              {cars.length} biler tilgjengelig. Alle biler er nøye kontrollert og
              leveres nybilklargjort.
            </p>
          </Reveal>

          <div className="mt-16 md:mt-24 grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((c, i) => (
              <Reveal key={c.id} delay={i * 90} className="h-full">
                <CarCard car={c} />
              </Reveal>
            ))}
          </div>

          <FinnSection listings={finnListings} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function FinnSection({ listings }: { listings: FinnListing[] }) {
  return (
    <section className="mt-24 md:mt-36 border-t border-hairline pt-16 md:pt-24">
      <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Direkte fra FINN</p>
          <h2 className="mt-5 text-[32px] sm:text-[44px] font-semibold tracking-[-0.03em] leading-[1.06]">
            Alle våre annonser
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-[1.75] max-w-[52ch]">
            Her hentes alle våre aktive FINN-annonser inn automatisk, med bilde, tittel og pris.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-hairline bg-secondary/60 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <RefreshCw className="h-3.5 w-3.5 text-brand" />
          {FINN_ENABLED ? "Live" : "Klar for tilkobling"}
        </span>
      </Reveal>

      <div className="mt-14 grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {listings.length > 0
          ? listings.map((l) => <FinnCard key={l.id} listing={l} />)
          : [0, 1, 2].map((i) => <FinnPlaceholderCard key={i} />)}
      </div>
    </section>
  );
}

function FinnCard({ listing }: { listing: FinnListing }) {
  return (
    <a
      href={listing.url ?? "#"}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden surface-card bg-background transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-float"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {listing.image && (
          <img
            src={listing.image}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-semibold tracking-tight">{listing.title}</h3>
        {listing.subtitle && (
          <p className="mt-2 text-[15px] text-muted-foreground">{listing.subtitle}</p>
        )}
        <p className="mt-auto pt-6 text-2xl font-semibold tracking-[-0.02em]">{listing.price}</p>
      </div>
    </a>
  );
}

function FinnPlaceholderCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-dashed border-hairline bg-secondary/40">
      <div className="aspect-[4/3] bg-muted/60" />
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="h-5 w-3/4 rounded-full bg-foreground/[0.07]" />
        <div className="h-4 w-1/2 rounded-full bg-foreground/[0.05]" />
        <div className="mt-auto h-7 w-2/5 rounded-full bg-brand/10" />
      </div>
    </div>
  );
}
