import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CarCard } from "@/components/site/CarCard";
import { Reveal } from "@/components/site/Reveal";
import { cars } from "@/lib/cars";

export const Route = createFileRoute("/biler/")({
  head: () => ({
    meta: [
      { title: "Våre biler – Auto Globe AS" },
      { name: "description", content: "Se alle våre kvalitetssikrede bruktbiler til salgs hos Auto Globe AS i Torp." },
      { property: "og:title", content: "Våre biler – Auto Globe AS" },
      { property: "og:description", content: "Utvalg av bruktbiler til salgs hos Auto Globe AS i Torp." },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
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
        </div>
      </main>
      <Footer />
    </>
  );
}
