import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone, Mail, ArrowLeft, Check } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CarCard } from "@/components/site/CarCard";
import { LeadForm } from "@/components/site/LeadForm";
import { Reveal } from "@/components/site/Reveal";
import { cars, formatKm, formatPrice, getCar } from "@/lib/cars";
import { company } from "@/lib/company";

export const Route = createFileRoute("/biler/$id")({
  loader: ({ params }) => {
    const car = getCar(params.id);
    if (!car) {
      // FINN-annonser har numerisk ID og hentes via vårt backend-endepunkt.
      if (/^\d{1,15}$/.test(params.id)) return { car: null, finnId: params.id };
      throw notFound();
    }
    return { car, finnId: null };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { car } = loaderData;
    if (!car) {
      return {
        meta: [
          { title: "Bil til salgs – Auto Globe AS" },
          { name: "description", content: "Se detaljer, utstyr og bilder for denne bilen hos Auto Globe AS i Torp." },
          { property: "og:title", content: "Bil til salgs – Auto Globe AS" },
          { property: "og:description", content: "Se detaljer, utstyr og bilder for denne bilen hos Auto Globe AS i Torp." },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
      };
    }
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
  const data = Route.useLoaderData() as {
    car: (typeof cars)[number] | null;
    finnId: string | null;
  };
  if (!data.car && data.finnId) return <FinnCarDetail id={data.finnId} />;
  return <CarDetail />;
}

function CarDetail() {
  const { car } = Route.useLoaderData() as { car: (typeof cars)[number] };
  const related = cars.filter((c) => c.id !== car.id).slice(0, 3);


  return (
    <>
      <Navbar />
      <main className="section-top pb-24 md:pb-36">
        <div className="container-page">
          <Link to="/biler" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Tilbake til alle biler
          </Link>

          <div className="mt-10 grid gap-12 lg:gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <div className="rounded-[28px] overflow-hidden bg-muted border border-hairline shadow-float">
                  <img src={car.image} alt={car.title} className="w-full aspect-[16/11] object-cover" />
                </div>
              </Reveal>

              <div className="mt-14">
                <p className="eyebrow">{car.brand}</p>
                <h1 className="mt-4 text-[38px] sm:text-5xl md:text-[60px] font-semibold tracking-[-0.035em] leading-[1.03]">
                  {car.title}
                </h1>
                <p className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  {formatPrice(car.priceNok)}
                </p>

                <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-y border-hairline py-10">
                  {[
                    { l: "Årsmodell", v: car.year },
                    { l: "Km stand", v: formatKm(car.mileageKm) },
                    { l: "Drivstoff", v: car.fuel },
                    { l: "Girkasse", v: car.transmission },
                  ].map((f: { l: string; v: string | number }) => (
                    <div key={f.l}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{f.l}</dt>
                      <dd className="mt-2 text-xl font-medium text-foreground">{f.v}</dd>
                    </div>
                  ))}
                </dl>

                <section className="mt-16">
                  <h2 className="text-3xl font-semibold tracking-tight">Beskrivelse</h2>
                  <p className="mt-6 text-lg text-muted-foreground leading-[1.8] max-w-[62ch]">{car.description}</p>
                </section>

                <section className="mt-16">
                  <h2 className="text-3xl font-semibold tracking-tight">Utstyr</h2>
                  <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {car.equipment.map((e) => (
                      <li key={e} className="flex items-start gap-3 text-[17px] text-foreground">
                        <Check className="h-5 w-5 text-brand shrink-0 mt-1" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-16">
                  <h2 className="text-3xl font-semibold tracking-tight">Spesifikasjoner</h2>
                  <dl className="mt-8 divide-y divide-hairline border-y border-hairline">
                    {car.specs.map((s: { label: string; value: string }) => (
                      <div key={s.label} className="flex justify-between gap-6 py-4 text-[15px]">
                        <dt className="text-muted-foreground">{s.label}</dt>
                        <dd className="font-medium text-foreground text-right">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div className="surface-card p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Pris</p>
                  <p className="mt-2 text-4xl font-semibold tracking-[-0.03em]">{formatPrice(car.priceNok)}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Finansiering fra ca. {formatPrice(Math.round(car.priceNok / 60))} pr. mnd*
                  </p>

                  <div className="mt-8 space-y-3">
                    <a href={company.phoneHref} className="btn btn-dark w-full">
                      <Phone className="h-4 w-4" /> Ring {company.phone}
                    </a>
                    <a
                      href={`mailto:${company.email}?subject=Interessert i ${car.title}`}
                      className="btn btn-outline-quiet w-full"
                    >
                      <Mail className="h-4 w-4" /> Send e-post
                    </a>
                  </div>

                  <ul className="mt-8 space-y-3 border-t border-hairline pt-7 text-[15px] text-muted-foreground">
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand" /> Finansiering tilgjengelig</li>
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand" /> Innbytte mulig</li>
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand" /> Bruktbilgaranti</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">
                    Vil du bytte inn din bil?
                  </h2>
                  <LeadForm variant="panel" />
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-28 md:mt-40">
              <h2 className="text-3xl md:text-[44px] font-semibold tracking-[-0.03em]">
                Andre biler du kanskje liker
              </h2>
              <div className="mt-12 grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((c, i) => (
                  <Reveal key={c.id} delay={i * 90} className="h-full">
                    <CarCard car={c} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
