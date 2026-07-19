import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone, Mail, ArrowLeft, Check } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CarCard } from "@/components/site/CarCard";
import { LeadForm } from "@/components/site/LeadForm";
import { cars, formatKm, formatPrice, getCar } from "@/lib/cars";
import { company } from "@/lib/company";

export const Route = createFileRoute("/biler/$id")({
  loader: ({ params }) => {
    const car = getCar(params.id);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { car } = loaderData;
    return {
      meta: [
        { title: `${car.title} – ${formatPrice(car.priceNok)} – Auto Globe AS` },
        { name: "description", content: `${car.title}, ${car.year}, ${formatKm(car.mileageKm)}, ${car.fuel}, ${car.transmission}. ${formatPrice(car.priceNok)}. Auto Globe AS i Torp.` },
        { property: "og:title", content: `${car.title} – ${formatPrice(car.priceNok)}` },
        { property: "og:description", content: `${car.year} · ${formatKm(car.mileageKm)} · ${car.fuel} · ${car.transmission}` },
        { property: "og:image", content: car.image },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: () => (
    <>
      <Navbar />
      <main className="pt-32 pb-20 container-page text-center">
        <h1 className="text-3xl font-semibold">Bilen finnes ikke</h1>
        <p className="mt-3 text-muted-foreground">Denne bilen er sannsynligvis solgt.</p>
        <Link to="/biler" className="mt-6 inline-block text-brand font-medium">Se andre biler →</Link>
      </main>
      <Footer />
    </>
  ),
  errorComponent: ({ error, reset }) => (
    <>
      <Navbar />
      <main className="pt-32 pb-20 container-page text-center">
        <h1 className="text-3xl font-semibold">Noe gikk galt</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 text-brand font-medium">Prøv igjen</button>
      </main>
      <Footer />
    </>
  ),
  component: CarDetail,
});

function CarDetail() {
  const { car } = Route.useLoaderData();
  const related = cars.filter((c) => c.id !== car.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="container-page">
          <Link to="/biler" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Tilbake til alle biler
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-2xl overflow-hidden bg-muted border border-hairline">
                <img src={car.image} alt={car.title} className="w-full aspect-[4/3] object-cover" />
              </div>

              <div className="mt-10">
                <p className="text-xs uppercase tracking-widest text-brand font-medium">{car.brand}</p>
                <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">{car.title}</h1>
                <p className="mt-4 text-2xl md:text-3xl font-semibold text-foreground">{formatPrice(car.priceNok)}</p>

                <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 border-y border-hairline py-8">
                  {[
                    { l: "Årsmodell", v: car.year },
                    { l: "Km stand", v: formatKm(car.mileageKm) },
                    { l: "Drivstoff", v: car.fuel },
                    { l: "Girkasse", v: car.transmission },
                  ].map((f: { l: string; v: string | number }) => (
                    <div key={f.l}>
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground">{f.l}</dt>
                      <dd className="mt-1 text-lg font-medium text-foreground">{f.v}</dd>
                    </div>
                  ))}
                </dl>

                <section className="mt-12">
                  <h2 className="text-2xl font-semibold">Beskrivelse</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-lg">{car.description}</p>
                </section>

                <section className="mt-12">
                  <h2 className="text-2xl font-semibold">Utstyr</h2>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {car.equipment.map((e) => (
                      <li key={e} className="flex items-start gap-3 text-foreground">
                        <Check className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-12">
                  <h2 className="text-2xl font-semibold">Spesifikasjoner</h2>
                  <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
                    {car.specs.map((s: { label: string; value: string }) => (
                      <div key={s.label} className="flex justify-between py-3 text-sm">
                        <dt className="text-muted-foreground">{s.label}</dt>
                        <dd className="font-medium text-foreground text-right">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="rounded-2xl border border-hairline bg-background shadow-card p-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Pris</p>
                  <p className="mt-1 text-3xl font-semibold">{formatPrice(car.priceNok)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Finansiering fra ca. {formatPrice(Math.round(car.priceNok / 60))} pr. mnd*</p>

                  <div className="mt-6 space-y-3">
                    <a href={company.phoneHref} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform">
                      <Phone className="h-4 w-4" /> Ring {company.phone}
                    </a>
                    <a href={`mailto:${company.email}?subject=Interessert i ${car.title}`} className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-5 py-3 font-semibold text-foreground hover:bg-accent">
                      <Mail className="h-4 w-4" /> Send e-post
                    </a>
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" /> Finansiering tilgjengelig</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" /> Innbytte mulig</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" /> Bruktbilgaranti</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Vil du bytte inn din bil?</h3>
                  <LeadForm variant="panel" />
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-24">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Andre biler du kanskje liker</h2>
              <div className="mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((c) => <CarCard key={c.id} car={c} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
