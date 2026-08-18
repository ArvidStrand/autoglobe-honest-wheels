import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { Reveal } from "@/components/site/Reveal";
import { company } from "@/lib/company";
import {
  fetchFinnListing,
  finnDescriptionToParagraphs,
  formatFinnKm,
  formatFinnPrice,
} from "@/lib/finn";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="section-top pb-24 md:pb-36">
        <div className="container-page">
          <Link
            to="/biler"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Tilbake til alle biler
          </Link>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function FinnCarDetail({ id }: { id: string }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["finn-ad", id],
    queryFn: () => fetchFinnListing(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  const [active, setActive] = useState(0);

  if (isPending) {
    return (
      <Shell>
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="aspect-[16/11] w-full animate-pulse rounded-[28px] bg-muted" />
            <div className="mt-10 h-10 w-2/3 animate-pulse rounded-full bg-muted" />
            <div className="mt-4 h-6 w-1/3 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="lg:col-span-4">
            <div className="h-72 animate-pulse rounded-[28px] bg-muted" />
          </div>
        </div>
      </Shell>
    );
  }

  if (isError || !data) {
    return (
      <Shell>
        <div className="py-24 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Bilen er ikke tilgjengelig</h1>
          <p className="mt-4 text-muted-foreground">
            Annonsen er sannsynligvis solgt eller avsluttet. Ta gjerne kontakt, så finner vi noe som passer.
          </p>
          <Link to="/biler" className="btn btn-dark mt-8">Se andre biler</Link>
        </div>
      </Shell>
    );
  }

  const car = data;
  const images = car.images?.length ? car.images : car.image ? [car.image] : [];
  const paragraphs = finnDescriptionToParagraphs(car.description);
  const facts = [
    { l: "Årsmodell", v: car.year },
    { l: "Km stand", v: formatFinnKm(car.mileageKm) },
    { l: "Drivstoff", v: car.fuel },
    { l: "Girkasse", v: car.transmission },
  ].filter((f) => Boolean(f.v)) as { l: string; v: string }[];

  const specs = [
    { label: "Effekt", value: car.effectHk ? `${car.effectHk} hk` : undefined },
    { label: "Hjuldrift", value: car.wheelDrive },
    { label: "Karosseri", value: car.bodyType },
    { label: "Seter", value: car.seats },
    { label: "Eiere", value: car.owners },
    { label: "1. gang registrert", value: car.firstRegistration },
    { label: "Sted", value: car.location },
  ].filter((s) => Boolean(s.value)) as { label: string; value: string }[];

  return (
    <Shell>
      <div className="mt-10 grid gap-12 lg:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {images.length > 0 && (
            <Reveal>
              <div className="overflow-hidden rounded-[28px] border border-hairline bg-muted shadow-float">
                <img
                  src={images[active]}
                  alt={`${car.title} hos Auto Globe AS`}
                  className="aspect-[16/11] w-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {images.slice(0, 12).map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`overflow-hidden rounded-2xl border transition-colors ${
                        i === active ? "border-foreground" : "border-hairline hover:border-foreground/40"
                      }`}
                      aria-label={`Vis bilde ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </Reveal>
          )}

          <div className="mt-14">
            {car.make && <p className="eyebrow">{car.make}</p>}
            <h1 className="mt-4 text-[38px] sm:text-5xl md:text-[60px] font-semibold tracking-[-0.035em] leading-[1.03]">
              {car.title}
            </h1>
            {car.subtitle && (
              <p className="mt-4 text-lg text-muted-foreground max-w-[62ch]">{car.subtitle}</p>
            )}
            <p className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {formatFinnPrice(car.priceNok)}
            </p>

            {facts.length > 0 && (
              <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-y border-hairline py-10">
                {facts.map((f) => (
                  <div key={f.l}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {f.l}
                    </dt>
                    <dd className="mt-2 text-xl font-medium text-foreground">{f.v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {paragraphs.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-semibold tracking-tight">Beskrivelse</h2>
                <div className="mt-6 space-y-4 max-w-[62ch]">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-lg text-muted-foreground leading-[1.8]">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {car.equipment && car.equipment.length > 0 && (
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
            )}

            {specs.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-semibold tracking-tight">Spesifikasjoner</h2>
                <dl className="mt-8 divide-y divide-hairline border-y border-hairline">
                  {specs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-6 py-4 text-[15px]">
                      <dt className="text-muted-foreground">{s.label}</dt>
                      <dd className="font-medium text-foreground text-right">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="surface-card p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Pris
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.03em]">
                {formatFinnPrice(car.priceNok)}
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
                <a
                  href={car.finnUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 pt-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Se annonsen på FINN
                  <ArrowUpRight className="h-4 w-4" />
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
    </Shell>
  );
}
