import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatFinnKm, formatFinnPrice, type FinnListing } from "@/lib/finn";

export function FinnCard({ listing }: { listing: FinnListing }) {
  const specs = [
    listing.year,
    formatFinnKm(listing.mileageKm),
    listing.fuel,
    listing.transmission,
  ].filter(Boolean) as string[];

  return (
    <Link
      to="/biler/$id"
      params={{ id: listing.id }}
      className="group flex h-full flex-col overflow-hidden surface-card bg-background transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-float"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-muted">
        {listing.image && (
          <img
            src={listing.image}
            alt={`${listing.title} bruktbil til salgs hos Auto Globe AS i Torp, Fredrikstad`}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
        {listing.year && (
          <span className="absolute left-4 top-4 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
            {listing.year}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        {listing.make && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {listing.make}
          </p>
        )}
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {listing.model ?? listing.title}
        </h3>
        {listing.subtitle && (
          <p className="mt-2 line-clamp-2 text-[15px] text-muted-foreground">{listing.subtitle}</p>
        )}

        {specs.length > 0 && (
          <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {specs.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-silver" />}
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-4 border-t border-hairline pt-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Pris</p>
              <p className="mt-1 text-[26px] leading-none font-semibold tracking-tight text-foreground">
                {formatFinnPrice(listing.priceNok)}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-4 py-2.5 text-sm font-semibold text-foreground transition-colors duration-[250ms] group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              Se bilen
              <ArrowUpRight className="h-4 w-4 transition-transform duration-[250ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FinnPlaceholderCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-dashed border-hairline bg-secondary/40">
      <div className="aspect-[4/3] bg-muted/60" />
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="h-5 w-3/4 rounded-full bg-foreground/[0.07]" />
        <div className="h-4 w-1/2 rounded-full bg-foreground/[0.05]" />
        <div className="mt-auto h-7 w-2/5 rounded-full bg-brand/10" />
      </div>
    </div>
  );
}
