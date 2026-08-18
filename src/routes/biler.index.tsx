import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { FinnCard, FinnPlaceholderCard } from "@/components/site/FinnCard";
import { fetchFinnListings } from "@/lib/finn";


export const Route = createFileRoute("/biler/")({
  head: () => ({
    meta: [
      { title: "Bruktbiler til salgs i Sandefjord – Auto Globe AS, Torp" },
      { name: "description", content: "Se alle aktive bruktbiler til salgs hos Auto Globe AS i Torp ved Sandefjord. Oppdatert utvalg med pris, årsmodell, km-stand og utstyr." },
      { property: "og:title", content: "Bruktbiler til salgs i Sandefjord – Auto Globe AS" },
      { property: "og:description", content: "Oppdatert utvalg av bruktbiler hos Auto Globe AS i Torp ved Sandefjord." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://autoglobe.no/biler" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://autoglobe.no/biler" }],
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
