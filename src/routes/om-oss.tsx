import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

import gl350 from "@/assets/gl350.asset.json";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss – Auto Globe AS" },
      { name: "description", content: "Auto Globe AS er en lokal bruktbilforhandler i Torp med mange års erfaring og fokus på ærlig kundebehandling." },
      { property: "og:title", content: "Om oss – Auto Globe AS" },
      { property: "og:description", content: "Lokal bruktbilforhandler i Torp med fokus på ærlig service." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="section-top pb-24 md:pb-36">
        <div className="container-page">
          <Reveal className="max-w-[62ch]">
            <p className="eyebrow">Auto Globe AS</p>
            <h1 className="mt-5 text-[40px] sm:text-6xl md:text-[68px] font-semibold tracking-[-0.035em] leading-[1.04]">
              Om oss
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-muted-foreground leading-[1.6] tracking-[-0.01em]">
              Din lokale bruktbilforhandler med fokus på kvalitet, trygghet og personlig service
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-16 md:mt-20">
            <div className="aspect-[16/9] overflow-hidden rounded-[28px] border border-hairline shadow-float">
              <img
                src={gl350.url}
                alt="Auto Globe AS – bruktbil"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-16 md:mt-24 max-w-[62ch] space-y-8 md:space-y-10 text-lg md:text-[19px] text-muted-foreground leading-[1.85]">
              <p className="text-foreground text-xl md:text-2xl leading-[1.7] tracking-[-0.01em] border-l-2 border-brand pl-6 md:pl-8">
                Auto Globe AS er en bruktbilforhandler som spesialiserer seg på kjøp og salg av
                bruktbiler til konkurransedyktige priser. Vi legger stor vekt på ærlighet, trygghet
                og personlig service, slik at du kan føle deg sikker gjennom hele bilhandelen. Hos
                oss finner du nøye utvalgte bruktbiler i ulike prisklasser, og vi hjelper deg med
                innbytte, finansiering og forsikring ved behov. Vårt mål er å gjøre bilkjøp og
                bilsalg enkelt, trygt og problemfritt.
              </p>
              <p>
                Hos Auto Globe AS ønsker vi å gjøre bilhandel enkel, trygg og forutsigbar. Fra våre
                lokaler i Sulfatveien 29 på Torp tilbyr vi nøye utvalgte bruktbiler med fokus på
                kvalitet, ærlighet og en kundeopplevelse du kan føle deg trygg på.
              </p>
              <p>
                Vi har flere års erfaring fra bilbransjen og vet hvor viktig det er med åpenhet, god
                service og en ryddig handel. Bil er mer enn bare et transportmiddel – det er en
                investering, og derfor ønsker vi at du skal føle deg trygg gjennom hele prosessen.
              </p>
              <p>
                Som en lokal og uavhengig bruktbilforhandler er vi opptatt av å være tilgjengelige
                for kundene våre. Vi tar oss tid til å svare på spørsmål, gi ærlige råd og hjelpe deg
                med å finne bilen som passer dine behov. Vi jobber kontinuerlig med å utvikle oss og
                forbedre kundeopplevelsen, fordi vi mener at god service er noe man fortjener – ikke
                noe man skal be om.
              </p>
              <p>
                For kunder som kommer langveisfra tilbyr vi videovisning av bilen før et eventuelt
                besøk. Da går vi gjennom bilen sammen, viser detaljer og svarer på spørsmål, slik at
                bilen i størst mulig grad står til forventningene når du kommer på prøvekjøring.
              </p>
              <p>
                Vi tilbyr også finansiering, innbytte og bruktbilgaranti på aktuelle biler, og kjøper
                biler direkte fra privatpersoner over hele Norge. Enten du skal kjøpe eller selge bil,
                er målet vårt å gjøre prosessen enkel, ryddig og trygg.
              </p>
              <p className="text-foreground">
                Hos Auto Globe AS handler bilkjøp om mer enn bare bilen – det handler om tillit, god
                service og en kundeopplevelse du gjerne anbefaler videre.
              </p>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

