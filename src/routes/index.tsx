import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Wallet, RefreshCw, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { CarCard } from "@/components/site/CarCard";
import { cars } from "@/lib/cars";
import { company } from "@/lib/company";
import gl350 from "@/assets/gl350.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auto Globe AS – Bruktbiler, innbytte og finansiering i Torp" },
      {
        name: "description",
        content:
          "Se våre bruktbiler eller få et uforpliktende tilbud på bilen din. Auto Globe AS i Torp tilbyr finansiering, innbytte og bruktbilgaranti.",
      },
      { property: "og:title", content: "Auto Globe AS – Bruktbiler i Torp" },
      {
        property: "og:description",
        content: "Kvalitetssikrede bruktbiler, innbytte og finansiering. Få tilbud på bilen din.",
      },
    ],
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
    <section className="relative isolate min-h-[820px] md:min-h-[880px] flex items-center pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={gl350.url}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/70" />
      </div>

      <div className="container-page w-full grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6 text-white">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/80">
            Auto Globe AS · Torp
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold leading-[1.05] tracking-tight">
            Hva er bilen din verdt?
          </h1>
          <p className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed">
            Få et uforpliktende tilbud på bilen din. Skriv inn registreringsnummer
            og kilometerstand — vi kontakter deg raskt med et godt tilbud.
          </p>

          <div className="mt-8 hidden sm:flex flex-wrap gap-6 text-sm text-white/80">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand" /> Trygg og enkel prosess</span>
            <span className="flex items-center gap-2"><Wallet className="h-4 w-4 text-brand" /> Rask utbetaling</span>
            <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-brand" /> Innbytte mulig</span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function Inventory() {
  return (
    <section id="biler" className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand font-medium">Tilgjengelig nå</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Våre biler</h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Et utvalg kvalitetssikrede bruktbiler. Alle biler leveres nybilklargjort
              og med mulighet for finansiering og bruktbilgaranti.
            </p>
          </div>
          <Link
            to="/biler"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors"
          >
            Se alle biler <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link to="/biler" className="inline-flex items-center gap-2 text-sm font-medium text-brand">
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
    <section className="py-20 md:py-28 bg-secondary/40 border-y border-hairline">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-brand font-medium">Hvorfor Auto Globe</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Enkelt, trygt og ærlig</h2>
        </div>
        <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl bg-background border border-hairline p-8 transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="h-11 w-11 rounded-md bg-brand/10 text-brand flex items-center justify-center">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{i.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{i.body}</p>
              <Link to={i.to} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors">
                {i.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="om-oss" className="py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand font-medium">Om oss</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            En lokal bilforhandler du kan stole på.
          </h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed max-w-xl">
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
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat number="15+" label="År i bransjen" />
            <Stat number="500+" label="Fornøyde kunder" />
            <Stat number="4,8/5" label="Kundeanmeldelser" />
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-hairline shadow-card">
            <img src={gl350.url} alt="Bruktbil fra Auto Globe" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-semibold tracking-tight">{number}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function MapContact() {
  return (
    <section id="kontakt" className="py-20 md:py-28 bg-secondary/40 border-t border-hairline">
      <div className="container-page grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-brand font-medium">Kontakt</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Kom innom oss</h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Vi tar imot uten timeavtale. Ring gjerne på forhånd så holder vi bilen klar.
          </p>

          <ul className="mt-8 space-y-5">
            <ContactItem icon={MapPin} title="Adresse" lines={[`${company.address.street}`, `${company.address.zip} ${company.address.city}`]} />
            <ContactItem icon={Phone} title="Telefon" lines={[company.phone]} href={company.phoneHref} />
            <ContactItem icon={Mail} title="E-post" lines={[company.email]} href={`mailto:${company.email}`} />
            <ContactItem
              icon={Clock}
              title="Åpningstider"
              lines={company.hours.map((h) => `${h.day}: ${h.time}`)}
            />
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform"
            >
              <Phone className="h-4 w-4" /> Ring oss
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${company.mapsQuery}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent"
            >
              Veibeskrivelse
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-hairline shadow-card bg-muted">
            <iframe
              title="Auto Globe AS – Kart"
              src={`https://www.google.com/maps?q=${company.mapsQuery}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon, title, lines, href,
}: { icon: any; title: string; lines: string[]; href?: string }) {
  const content = (
    <div className="flex gap-4">
      <div className="mt-0.5 h-9 w-9 rounded-md bg-background border border-hairline flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-brand" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-base text-foreground">{l}</p>
        ))}
      </div>
    </div>
  );
  return <li>{href ? <a href={href} className="hover:opacity-80">{content}</a> : content}</li>;
}
