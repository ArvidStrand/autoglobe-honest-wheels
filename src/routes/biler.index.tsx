import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
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
  const { data, isPending, isError } = useQuery({
    queryKey: ["finn-listings"],
    queryFn: fetchFinnListings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const listings = data ?? [];

  return (
    <>
      <Navbar />
      <main className="section-top pb-24 md:pb-36">
        <div className="container-page">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="text-[44px] sm:text-6xl md:text-[72px] font-semibold tracking-[-0.035em] leading-[1.02]">
              Våre biler
            </h1>
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-hairline bg-secondary/60 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <RefreshCw className={`h-3.5 w-3.5 text-brand ${isPending ? "animate-spin" : ""}`} />
              {isPending ? "Oppdaterer" : isError ? "Midlertidig utilgjengelig" : `${listings.length} aktive`}
            </span>
          </Reveal>

          {isError && (
            <p className="mt-14 rounded-[24px] border border-hairline bg-secondary/40 p-10 text-center text-muted-foreground">
              Vi får akkurat nå ikke hentet annonsene våre. Ring oss gjerne, så finner vi bilen sammen.
            </p>
          )}

          {!isError && !isPending && listings.length === 0 && (
            <p className="mt-14 rounded-[24px] border border-hairline bg-secondary/40 p-10 text-center text-muted-foreground">
              Ingen aktive annonser akkurat nå. Nye biler kommer inn fortløpende.
            </p>
          )}

          <div className="mt-14 md:mt-18 grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {isPending
              ? [0, 1, 2].map((i) => <FinnPlaceholderCard key={i} />)
              : listings.map((l, i) => (
                  <Reveal key={l.id} delay={i * 70} className="h-full">
                    <FinnCard listing={l} />
                  </Reveal>
                ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FinnCard({ listing }: { listing: FinnListing }) {
  const specs = [
    listing.year,
    formatFinnKm(listing.mileageKm),
    listing.fuel,
    listing.transmission,
  ].filter(Boolean) as string[];

  return (
    <Link
      to="/biler/$id"
      params={{ id: listing.id }}
      className="group flex h-full flex-col overflow-hidden surface-card bg-background transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-float"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-muted">
        {listing.image && (
          <img
            src={listing.image}
            alt={`${listing.title} til salgs hos Auto Globe AS`}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
        {listing.year && (
          <span className="absolute left-4 top-4 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
            {listing.year}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        {listing.make && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {listing.make}
          </p>
        )}
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {listing.model ?? listing.title}
        </h3>
        {listing.subtitle && (
          <p className="mt-2 line-clamp-2 text-[15px] text-muted-foreground">{listing.subtitle}</p>
        )}

        {specs.length > 0 && (
          <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {specs.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-silver" />}
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-4 border-t border-hairline pt-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Pris</p>
              <p className="mt-1 text-[26px] leading-none font-semibold tracking-tight text-foreground">
                {formatFinnPrice(listing.priceNok)}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-4 py-2.5 text-sm font-semibold text-foreground transition-colors duration-[250ms] group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              Se bilen
              <ArrowUpRight className="h-4 w-4 transition-transform duration-[250ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
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

