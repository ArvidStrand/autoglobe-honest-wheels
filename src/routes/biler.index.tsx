import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CarCard } from "@/components/site/CarCard";
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
      <main className="pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-brand font-medium">Bilutvalg</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">Våre biler</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              {cars.length} biler tilgjengelig. Alle biler er nøye kontrollert og
              leveres nybilklargjort.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
