import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShieldCheck, Wallet, RefreshCw, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { FinnCard, FinnPlaceholderCard } from "@/components/site/FinnCard";
import { Reveal } from "@/components/site/Reveal";
import { fetchFinnListings } from "@/lib/finn";
import { company } from "@/lib/company";
import gl350 from "@/assets/gl350.jpg";
import hyundai from "@/assets/hyundai-tucson.jpg";
import nokler from "@/assets/nokler.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auto Globe AS – Bruktbilforhandler i Torp, Fredrikstad" },
      {
        name: "description",
        content:
          "Auto Globe AS er bruktbilforhandler i Torp, Fredrikstad. Se bruktbiler til salgs, eller få et uforpliktende tilbud på bilen din. Finansiering og innbytte.",
      },
      { property: "og:title", content: "Auto Globe AS – Bruktbilforhandler i Torp, Fredrikstad" },
      {
        property: "og:description",
        content: "Bruktbiler til salgs i Fredrikstad-området. Finansiering, innbytte og ærlig service hos Auto Globe AS.",
      },
      { property: "og:url", content: "https://autoglobe.no/" },
    ],
    links: [{ rel: "canonical", href: "https://autoglobe.no/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Navbar transparentOverHero />
      <main>
        <Hero />
        <Inventory />
        <Trust />
        <About />
        <MapContact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] lg:min-h-[1000px] flex items-center pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="absolute inset-0 -z-10">
        <img
          src={gl350}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      </div>

      <div className="container-page w-full grid gap-14 lg:gap-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6 text-white">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Auto Globe AS · Torp
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 text-[44px] sm:text-6xl md:text-7xl lg:text-[84px] font-semibold leading-[0.98] tracking-[-0.035em]">
              Hva er bilen
              <br />
              din verdt?
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 text-lg md:text-xl text-white/75 max-w-[46ch] leading-[1.7]">
              Få et uforpliktende tilbud på bilen din. Skriv inn registreringsnummer
              og kilometerstand — vi kontakter deg raskt med et godt tilbud.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 hidden sm:flex flex-wrap gap-x-10 gap-y-4 text-[15px] text-white/70">
              <span className="flex items-center gap-2.5"><ShieldCheck className="h-[18px] w-[18px] text-brand" /> Trygg og enkel prosess</span>
              <span className="flex items-center gap-2.5"><Wallet className="h-[18px] w-[18px] text-brand" /> Rask utbetaling</span>
              <span className="flex items-center gap-2.5"><RefreshCw className="h-[18px] w-[18px] text-brand" /> Innbytte mulig</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-6">
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  body,
  className = "",
}: { eyebrow: string; title: string; body?: string; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-[34px] sm:text-5xl md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05]">
        {title}
      </h2>
      {body && (
        <p className="mt-6 text-lg text-muted-foreground leading-[1.75] max-w-[54ch]">{body}</p>
      )}
    </div>
  );
}

function Inventory() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["finn-listings"],
    queryFn: fetchFinnListings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  const listings = data ?? [];

  return (
    <section id="biler" className="section-y">
      <div className="container-page">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <SectionHead
            eyebrow="Tilgjengelig nå"
            title="Våre biler"
            body="Et utvalg kvalitetssikrede bruktbiler. Alle biler leveres nybilklargjort og med mulighet for finansiering og bruktbilgaranti."
          />
          <Link
            to="/biler"
            className="hidden md:inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-foreground transition-colors hover:text-brand"
          >
            Se alle biler <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {isError && (
          <p className="rounded-[24px] border border-hairline bg-secondary/40 p-10 text-center text-muted-foreground">
            Vi får akkurat nå ikke hentet annonsene våre. Ring oss gjerne, så finner vi bilen sammen.
          </p>
        )}

        {!isError && !isPending && listings.length === 0 && (
          <p className="rounded-[24px] border border-hairline bg-secondary/40 p-10 text-center text-muted-foreground">
            Ingen aktive annonser akkurat nå. Nye biler kommer inn fortløpende.
          </p>
        )}

        <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {isPending
            ? [0, 1, 2].map((i) => <FinnPlaceholderCard key={i} />)
            : listings.slice(0, 6).map((l, i) => (
                <Reveal key={l.id} delay={i * 90} className="h-full">
                  <FinnCard listing={l} />
                </Reveal>
              ))}
        </div>

        <div className="mt-12 md:hidden">
          <Link to="/biler" className="btn btn-outline-quiet w-full">
            Se alle biler <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    {
      icon: Wallet,
      title: "Finansiering",
      body: "Vi tilbyr gunstig billån gjennom våre samarbeidspartnere. Få svar raskt og enkelt.",
      cta: "Les mer",
      to: "/kontakt",
    },
    {
      icon: RefreshCw,
      title: "Innbytte",
      body: "Bytt inn din gamle bil som del av kjøpet. Vi gir en ærlig og markedsriktig pris.",
      cta: "Få vurdering",
      to: "/selg",
    },
    {
      icon: ShieldCheck,
      title: "Bruktbilgaranti",
      body: "Alle våre biler kan leveres med utvidet garanti. Kjør trygt, uten bekymringer.",
      cta: "Snakk med oss",
      to: "/kontakt",
    },
  ];
  return (
    <section className="section-y bg-secondary/50 border-y border-hairline">
      <div className="container-page">
        <Reveal>
          <SectionHead eyebrow="Hvorfor Auto Globe" title="Enkelt, trygt og ærlig" className="max-w-2xl" />
        </Reveal>
        <div className="mt-16 md:mt-20 grid gap-8 md:gap-10 md:grid-cols-3">
          {items.map((i, idx) => (
            <Reveal key={i.title} delay={idx * 90} className="h-full">
              <Link
                to={i.to}
                className="group flex h-full flex-col surface-card bg-background p-9 md:p-10 transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-float"
              >
                <div className="relative h-16 w-16 rounded-2xl bg-brand/[0.07] text-brand flex items-center justify-center transition-colors duration-[250ms] group-hover:bg-brand group-hover:text-brand-foreground">
                  <i.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight">{i.title}</h3>
                <p className="mt-4 text-muted-foreground leading-[1.75]">{i.body}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-foreground transition-colors group-hover:text-brand">
                  {i.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-[250ms] group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="om-oss" className="section-y">
      <div className="container-page grid gap-16 lg:gap-24 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <SectionHead
            eyebrow="Om oss"
            title="En lokal bilforhandler du kan stole på."
          />
          <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-[1.8] max-w-[58ch]">
            <p>
              Auto Globe AS er en lokal bruktbilforhandler i Torp med mange års erfaring
              fra bilbransjen. Vi selger rimelige bruktbiler av god kvalitet, og legger
              stor vekt på ærlig kundebehandling.
            </p>
            <p>
              Vi tilbyr finansiering, innbytte og bruktbilgaranti, og kjøper også biler
              direkte fra privatpersoner. Vår filosofi er enkel: si det som det er,
              lever det vi lover, og behandle hver kunde slik vi selv vil bli behandlet.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 divide-x divide-hairline border-y border-hairline">
            <Stat number="15+" label="År i bransjen" />
            <Stat number="500+" label="Fornøyde kunder" />
            <Stat number="5/5" label="Kundeanmeldelser" />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[28px] border border-hairline shadow-float">
              <img
                src={hyundai}
                alt="Hvit Hyundai Tucson bruktbil fra Auto Globe AS i Torp, Fredrikstad"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-10 -left-10 w-52 overflow-hidden rounded-3xl border border-hairline shadow-float bg-background">
              <img
                src={nokler}
                alt="Bilnøkler med Auto Globe-nøkkelring overrekkes til fornøyd kunde"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="px-2 py-8 first:pl-0 text-center first:text-left last:text-right">
      <p className="text-4xl md:text-[52px] font-semibold tracking-[-0.04em] leading-none">
        {number}
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function MapContact() {
  return (
    <section id="kontakt" className="section-y bg-secondary/50 border-t border-hairline">
      <div className="container-page">
        <Reveal>
          <SectionHead
            eyebrow="Kontakt"
            title="Kom innom oss"
            body="Vi tar imot uten timeavtale. Ring gjerne på forhånd så holder vi bilen klar."
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mt-16 md:mt-20 grid gap-10 lg:gap-14 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="surface-card bg-background p-8 md:p-10">
              <a
                href={company.phoneHref}
                className="group block rounded-2xl bg-foreground p-7 text-background transition-transform duration-[250ms] hover:-translate-y-1"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-background/60">
                  Ring oss direkte
                </p>
                <p className="mt-3 flex items-center gap-3 text-[32px] md:text-[38px] font-semibold tracking-[-0.03em] leading-none">
                  <Phone className="h-6 w-6 text-brand" />
                  {company.phone}
                </p>
              </a>

              <ul className="mt-8 space-y-7">
                <ContactItem icon={MapPin} title="Adresse" lines={[company.address.street, `${company.address.zip} ${company.address.city}`]} />
                <ContactItem icon={Mail} title="E-post" lines={[company.email]} href={`mailto:${company.email}`} />
                <ContactItem
                  icon={Clock}
                  title="Åpningstider"
                  lines={company.hours.map((h) => `${h.day}: ${h.time}`)}
                />
              </ul>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${company.mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-quiet mt-9 w-full"
              >
                Veibeskrivelse <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[28px] border border-hairline shadow-float bg-muted h-[460px] md:h-[620px] lg:h-[720px]">
              <iframe
                title="Auto Globe AS – Kart"
                src={`https://www.google.com/maps?q=${company.mapsQuery}&output=embed`}
                className="h-full w-full grayscale-[0.85] contrast-[1.05] transition-[filter] duration-500 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-black/5" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon, title, lines, href,
}: { icon: any; title: string; lines: string[]; href?: string }) {
  const content = (
    <div className="flex gap-5">
      <div className="mt-0.5 h-11 w-11 rounded-xl bg-brand/[0.07] flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-brand" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</p>
        {lines.map((l) => (
          <p key={l} className="mt-1 text-[17px] text-foreground leading-relaxed">{l}</p>
        ))}
      </div>
    </div>
  );
  return <li>{href ? <a href={href} className="block transition-opacity hover:opacity-70">{content}</a> : content}</li>;
}
