import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FinnCarDetail } from "@/components/site/FinnCarDetail";
import { fetchFinnListing, formatFinnKm, formatFinnPrice, type FinnListing } from "@/lib/finn";
import { getFinnAdFn } from "@/lib/finn.functions";

const SITE = "https://autoglobe-honest-wheels.lovable.app";

export const Route = createFileRoute("/biler/$id")({
  loader: async ({ params }) => {
    if (!/^\d{1,15}$/.test(params.id)) throw notFound();
    let listing: FinnListing | null = null;
    try {
      listing = (await getFinnAdFn({ data: { id: params.id } })) as FinnListing | null;
    } catch {
      try {
        listing = await fetchFinnListing(params.id);
      } catch {
        listing = null;
      }
    }
    return { finnId: params.id, listing };
  },
  head: ({ params, loaderData }) => {
    const url = `${SITE}/biler/${params.id}`;
    const car = loaderData?.listing;
    const links = [{ rel: "canonical", href: url }];

    if (!car) {
      return {
        meta: [
          { title: "Bruktbil til salgs – Auto Globe AS i Torp" },
          {
            name: "description",
            content:
              "Se detaljer, utstyr og bilder for denne bruktbilen hos Auto Globe AS i Torp ved Sandefjord.",
          },
          { property: "og:title", content: "Bruktbil til salgs – Auto Globe AS" },
          { property: "og:url", content: url },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links,
      };
    }

    const facts = [car.year, formatFinnKm(car.mileageKm), car.fuel, car.transmission]
      .filter(Boolean)
      .join(" · ");
    const title = `${car.title} – ${formatFinnPrice(car.priceNok)} – Auto Globe AS`;
    const description = `${car.title}${facts ? `. ${facts}` : ""}. ${formatFinnPrice(
      car.priceNok,
    )}. Bruktbil til salgs hos Auto Globe AS i Torp ved Sandefjord.`;

    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: `${car.title} – ${formatFinnPrice(car.priceNok)}` },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (car.image) {
      meta.push({ property: "og:image", content: car.image });
      meta.push({ name: "twitter:image", content: car.image });
    }

    const vehicle: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Car",
      name: car.title,
      url,
      ...(car.make ? { brand: { "@type": "Brand", name: car.make } } : {}),
      ...(car.model ? { model: car.model } : {}),
      ...(car.year ? { vehicleModelDate: car.year } : {}),
      ...(car.image ? { image: car.images?.length ? car.images.slice(0, 8) : [car.image] } : {}),
      ...(car.description ? { description: car.description.replace(/<[^>]+>/g, " ").slice(0, 500) } : {}),
      ...(typeof car.mileageKm === "number"
        ? {
            mileageFromOdometer: {
              "@type": "QuantitativeValue",
              value: car.mileageKm,
              unitCode: "KMT",
            },
          }
        : {}),
      ...(car.fuel ? { fuelType: car.fuel } : {}),
      ...(car.transmission ? { vehicleTransmission: car.transmission } : {}),
      ...(car.seats ? { seatingCapacity: car.seats } : {}),
      ...(typeof car.priceNok === "number"
        ? {
            offers: {
              "@type": "Offer",
              price: car.priceNok,
              priceCurrency: "NOK",
              availability: "https://schema.org/InStock",
              url,
              seller: { "@type": "AutoDealer", name: "Auto Globe AS" },
            },
          }
        : {}),
    };

    return {
      meta,
      links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(vehicle) }],
    };
  },

  notFoundComponent: () => (
    <>
      <Navbar />
      <main className="section-top pb-24 container-page text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Bilen finnes ikke</h1>
        <p className="mt-4 text-muted-foreground">Denne bilen er sannsynligvis solgt.</p>
        <Link to="/biler" className="btn btn-dark mt-8">Se andre biler</Link>
      </main>
      <Footer />
    </>
  ),
  errorComponent: ({ error, reset }) => (
    <>
      <Navbar />
      <main className="section-top pb-24 container-page text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Noe gikk galt</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="btn btn-dark mt-8">Prøv igjen</button>
      </main>
      <Footer />
    </>
  ),
  component: CarDetailRoute,
});

function CarDetailRoute() {
  const { finnId } = Route.useLoaderData();
  return <FinnCarDetail id={finnId} />;
}
