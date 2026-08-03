import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { company } from "@/lib/company";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-secondary/50">
      <div className="container-page py-20 md:py-24 grid gap-14 md:gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="h-14 w-auto" />
          <p className="mt-6 text-[15px] text-muted-foreground leading-[1.75] max-w-[32ch]">
            Kvalitetssikrede bruktbiler med ærlig service og trygg handel.
          </p>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-6">Navigasjon</h2>
          <ul className="space-y-3.5 text-[15px] text-foreground/80">
            <li><Link to="/biler" className="transition-colors hover:text-brand">Våre biler</Link></li>
            <li><Link to="/selg" className="transition-colors hover:text-brand">Selg bilen</Link></li>
            <li><Link to="/om-oss" className="transition-colors hover:text-brand">Om oss</Link></li>
            <li><Link to="/kontakt" className="transition-colors hover:text-brand">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-6">Kontakt</h2>
          <ul className="space-y-3.5 text-[15px] text-foreground/80">
            <li>{company.address.street}</li>
            <li>{company.address.zip} {company.address.city}</li>
            <li><a href={company.phoneHref} className="transition-colors hover:text-brand">{company.phone}</a></li>
            <li><a href={`mailto:${company.email}`} className="transition-colors hover:text-brand">{company.email}</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-6">Åpningstider</h2>
          <ul className="space-y-3.5 text-[15px] text-foreground/80">
            {company.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span><span className="text-muted-foreground">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Auto Globe AS. Org. nr. — Alle rettigheter reservert.</p>
          <p>Personvern</p>
        </div>
      </div>
    </footer>
  );
}
