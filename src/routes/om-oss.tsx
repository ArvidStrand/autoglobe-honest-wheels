import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, HeartHandshake, ArrowRight, Wallet, RefreshCw, Video } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { company } from "@/lib/company";

import lokalet from "@/assets/lokalet.jpg";
import handhilse from "@/assets/handhilse.mp4";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss – Auto Globe AS" },
      { name: "description", content: "Auto Globe AS er en lokal bruktbilforhandler i Torp med mange års erfaring og fokus på ærlig kundebehandling." },
      { property: "og:title", content: "Om oss – Auto Globe AS" },
      { property: "og:description", content: "Lokal bruktbilforhandler i Torp med fokus på ærlig service." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Lokalet />
        <Statement />
        <Values />
        <Handshake />
        <Services />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="section-top pb-20 md:pb-28">
      <div className="container-page">
        <Reveal className="max-w-[62ch]">
          <p className="eyebrow">Auto Globe AS</p>
          <h1 className="mt-6 text-[40px] sm:text-6xl md:text-[72px] font-semibold tracking-[-0.035em] leading-[1.03]">
            Om oss
          </h1>
          <p className="mt-10 text-xl md:text-2xl text-muted-foreground leading-[1.6] tracking-[-0.01em]">
            Din lokale bruktbilforhandler med fokus på kvalitet, trygghet og personlig service
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Lokalet() {
  return (
    <section className="pb-24 md:pb-36">
      <div className="container-page grid gap-14 lg:gap-20 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-7">
          <div className="overflow-hidden rounded-[28px] border border-hairline shadow-float">
            <img
              src={lokalet}
              alt="Auto Globe AS sitt lokale i Sulfatveien 29 på Torp, med biler oppstilt utenfor i skumringen"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <p className="eyebrow">Lokalet vårt</p>
          <h2 className="mt-5 text-[32px] sm:text-[42px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.08]">
            Velkommen innom<br />på Torp
          </h2>
          <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-[1.85] max-w-[52ch]">
            <p>
              Hos Auto Globe AS ønsker vi å gjøre bilhandel enkel, trygg og forutsigbar. Fra våre
              lokaler i {company.address.street} på Torp tilbyr vi nøye utvalgte bruktbiler med fokus på
              kvalitet, ærlighet og en kundeopplevelse du kan føle deg trygg på.
            </p>
            <p>
              Vi har flere års erfaring fra bilbransjen og vet hvor viktig det er med åpenhet, god
              service og en ryddig handel. Bil er mer enn bare et transportmiddel – det er en
              investering, og derfor ønsker vi at du skal føle deg trygg gjennom hele prosessen.
            </p>
          </div>
          <Link to="/kontakt" className="btn btn-dark mt-10">
            Finn veien til oss <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="pb-24 md:pb-36">
      <div className="container-page">
        <Reveal className="max-w-[24ch]">
          <span className="block h-1 w-16 rounded-full bg-brand" />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-10 max-w-[24ch] sm:max-w-[30ch] text-[28px] sm:text-[38px] md:text-[46px] font-semibold tracking-[-0.03em] leading-[1.15]">
            Auto Globe AS er en bruktbilforhandler som spesialiserer seg på kjøp og salg av
            bruktbiler til konkurransedyktige priser.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-10 max-w-[62ch] text-lg md:text-[19px] text-muted-foreground leading-[1.85]">
            Vi legger stor vekt på ærlighet, trygghet og personlig service, slik at du kan føle deg
            sikker gjennom hele bilhandelen. Hos oss finner du nøye utvalgte bruktbiler i ulike
            prisklasser, og vi hjelper deg med innbytte, finansiering og forsikring ved behov. Vårt
            mål er å gjøre bilkjøp og bilsalg enkelt, trygt og problemfritt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Values() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Trygghet",
      body: "Åpenhet og ryddig handel fra første kontakt til nøklene er levert. Du skal føle deg trygg gjennom hele prosessen.",
    },
    {
      icon: Sparkles,
      title: "Kvalitet",
      body: "Nøye utvalgte bruktbiler i ulike prisklasser, kontrollert og klargjort før de settes ut for salg.",
    },
    {
      icon: HeartHandshake,
      title: "Personlig service",
      body: "Vi tar oss tid til å svare på spørsmål, gi ærlige råd og hjelpe deg med å finne bilen som passer dine behov.",
    },
  ];
  return (
    <section className="section-y bg-foreground text-background">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Slik jobber vi</p>
          <h2 className="mt-5 text-[34px] sm:text-5xl md:text-[52px] font-semibold tracking-[-0.03em] leading-[1.06]">
            Tre ting vi aldri gir slipp på
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20 grid gap-10 md:gap-12 md:grid-cols-3">
          {items.map((i, idx) => (
            <Reveal key={i.title} delay={idx * 90}>
              <div className="group border-t border-background/15 pt-9">
                <div className="h-14 w-14 rounded-2xl bg-brand/15 text-brand flex items-center justify-center transition-colors duration-[250ms] group-hover:bg-brand group-hover:text-brand-foreground">
                  <i.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-7 text-2xl font-semibold tracking-tight">{i.title}</h3>
                <p className="mt-4 text-background/65 leading-[1.8]">{i.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Handshake() {
  return (
    <section className="section-y">
      <div className="container-page grid gap-14 lg:gap-20 lg:grid-cols-12 lg:items-center">
        <Reveal delay={80} className="lg:col-span-5 lg:order-2">
          <p className="eyebrow">Møtet med kunden</p>
          <h2 className="mt-5 text-[32px] sm:text-[42px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.08]">
            Tillit fra første håndtrykk
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-[1.85] max-w-[50ch]">
            Hos oss blir du møtt med tillit og personlig oppfølging gjennom hele prosessen – fra
            første spørsmål til bilen er din. Vi er tilgjengelige for kundene våre, svarer ærlig
            og følger deg opp også etter at handelen er gjort.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:order-1">
          <div className="overflow-hidden rounded-[28px] border border-hairline shadow-float bg-muted">
            <img
              src={handhilse.url}
              alt="Selger fra Auto Globe AS håndhilser på en fornøyd kunde"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const cards = [
    {
      icon: Video,
      title: "Videovisning",
      body: "For kunder som kommer langveisfra tilbyr vi videovisning av bilen før et eventuelt besøk. Da går vi gjennom bilen sammen, viser detaljer og svarer på spørsmål, slik at bilen i størst mulig grad står til forventningene når du kommer på prøvekjøring.",
    },
    {
      icon: Wallet,
      title: "Finansiering",
      body: "Vi tilbyr finansiering og bruktbilgaranti på aktuelle biler, slik at du kan velge løsningen som passer din økonomi – uten skjulte overraskelser underveis.",
    },
    {
      icon: RefreshCw,
      title: "Innbytte og bilkjøp",
      body: "Vi tar imot bilen din i innbytte, og kjøper biler direkte fra privatpersoner over hele Norge. Enten du skal kjøpe eller selge bil, er målet vårt å gjøre prosessen enkel, ryddig og trygg.",
    },
  ];
  return (
    <section className="section-y bg-secondary/50 border-y border-hairline">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Hva vi tilbyr</p>
          <h2 className="mt-5 text-[34px] sm:text-5xl md:text-[52px] font-semibold tracking-[-0.03em] leading-[1.06]">
            Alt du trenger på ett sted
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20 grid gap-8 md:gap-10 md:grid-cols-3">
          {cards.map((c, idx) => (
            <Reveal key={c.title} delay={idx * 90} className="h-full">
              <div className="flex h-full flex-col surface-card bg-background p-9 md:p-10 transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-float">
                <div className="h-14 w-14 rounded-2xl bg-brand/[0.07] text-brand flex items-center justify-center">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-4 text-muted-foreground leading-[1.8]">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-foreground text-background px-8 py-16 sm:px-14 md:px-20 md:py-24">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
            <div className="relative max-w-[38ch]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                Auto Globe AS
              </p>
              <p className="mt-6 text-[28px] sm:text-[38px] md:text-[44px] font-semibold tracking-[-0.03em] leading-[1.15]">
                Hos oss handler bilkjøp om mer enn bare bilen – det handler om tillit, god service
                og en kundeopplevelse du gjerne anbefaler videre.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link to="/biler" className="btn btn-brand btn-lg">
                  Se våre biler <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={company.phoneHref} className="btn btn-lg border border-background/25 text-background transition-colors hover:bg-background/10">
                  Ring {company.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
