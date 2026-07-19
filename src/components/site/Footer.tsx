import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { company } from "@/lib/company";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline bg-secondary/40">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="h-10 w-auto" />
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Kvalitetssikrede bruktbiler med ærlig service og trygg handel.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Navigasjon</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/biler" className="hover:text-foreground">Våre biler</Link></li>
            <li><Link to="/selg" className="hover:text-foreground">Selg bilen</Link></li>
            <li><Link to="/om-oss" className="hover:text-foreground">Om oss</Link></li>
            <li><Link to="/kontakt" className="hover:text-foreground">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Kontakt</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{company.address.street}</li>
            <li>{company.address.zip} {company.address.city}</li>
            <li><a href={company.phoneHref} className="hover:text-foreground">{company.phone}</a></li>
            <li><a href={`mailto:${company.email}`} className="hover:text-foreground">{company.email}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Åpningstider</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {company.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span><span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Auto Globe AS. Org. nr. — Alle rettigheter reservert.</p>
          <p>Personvern</p>
        </div>
      </div>
    </footer>
  );
}
