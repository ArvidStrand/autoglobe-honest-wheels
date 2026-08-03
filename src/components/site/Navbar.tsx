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
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid
          ? "bg-background/75 backdrop-blur-xl border-b border-hairline shadow-[0_1px_0_0_rgb(15_15_15/0.02)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between transition-[height] duration-500",
          scrolled ? "h-[76px] md:h-[88px]" : "h-20 md:h-28",
        )}
      >
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo
            className={cn(
              "w-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled ? "h-11 md:h-14" : "h-12 md:h-16",
            )}
          />

        </Link>

        <nav className="hidden md:flex items-center gap-10 lg:gap-12">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "relative text-[15px] font-medium tracking-tight transition-colors duration-250 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100",
                solid ? "text-foreground/75 hover:text-foreground" : "text-white/80 hover:text-white",
              )}
              activeProps={{ className: solid ? "text-foreground" : "text-white" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href={company.phoneHref}
            className={cn(
              "inline-flex items-center gap-2 text-[15px] font-medium tracking-tight transition-colors",
              solid ? "text-foreground/75 hover:text-foreground" : "text-white/85 hover:text-white",
            )}
          >
            <Phone className="h-4 w-4" />
            {company.phone}
          </a>
          <Link to="/selg" className="btn btn-brand">
            Få tilbud på bilen
          </Link>
        </div>

        <button
          className={cn(
            "md:hidden -mr-2 p-2 rounded-full transition-colors",
            solid ? "text-foreground" : "text-white",
          )}
          onClick={() => setOpen((o) => !o)}
          aria-label="Meny"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-hairline animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="container-page py-8 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-4 text-xl font-medium tracking-tight text-foreground hairline-b"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="py-4 text-xl font-medium text-foreground flex items-center gap-3 hairline-b"
            >
              <Phone className="h-5 w-5 text-brand" /> {company.phone}
            </a>
            <Link
              to="/selg"
              onClick={() => setOpen(false)}
              className="btn btn-brand btn-lg mt-8 w-full"
            >
              Få tilbud på bilen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
