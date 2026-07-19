import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/biler", label: "Våre biler" },
  { to: "/selg", label: "Selg bilen" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
];

export function Navbar({ transparentOverHero = false }: { transparentOverHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparentOverHero || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-background/90 backdrop-blur-md border-b border-hairline"
          : "bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Logo className={cn("h-8 w-auto md:h-10 transition", solid ? "" : "brightness-0 invert")} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "text-sm font-medium transition-colors",
                solid ? "text-foreground/80 hover:text-foreground" : "text-white/85 hover:text-white",
              )}
              activeProps={{ className: solid ? "text-foreground" : "text-white" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={company.phoneHref}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium transition-colors",
              solid ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white",
            )}
          >
            <Phone className="h-4 w-4" />
            {company.phone}
          </a>
          <Link
            to="/selg"
            className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5 hover:shadow-md"
          >
            Få tilbud på bilen
          </Link>
        </div>

        <button
          className={cn(
            "md:hidden p-2 rounded-md transition-colors",
            solid ? "text-foreground" : "text-white",
          )}
          onClick={() => setOpen((o) => !o)}
          aria-label="Meny"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-hairline">
          <div className="container-page py-6 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-medium text-foreground hairline-b"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="py-3 text-lg font-medium text-foreground flex items-center gap-2 hairline-b"
            >
              <Phone className="h-5 w-5" /> {company.phone}
            </a>
            <Link
              to="/selg"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex justify-center rounded-md bg-brand px-4 py-3 font-semibold text-brand-foreground"
            >
              Få tilbud på bilen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
