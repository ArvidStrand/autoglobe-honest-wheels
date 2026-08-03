import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Car } from "@/lib/cars";
import { formatKm, formatPrice } from "@/lib/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/biler/$id"
      params={{ id: car.id }}
      className="group flex flex-col overflow-hidden surface-card transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-float"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-muted">
        <img
          src={car.image}
          alt={`${car.title} til salgs hos Auto Globe AS`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
          {car.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {car.brand}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {car.model}
        </h3>

        <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <li>{formatKm(car.mileageKm)}</li>
          <li aria-hidden className="h-1 w-1 rounded-full bg-silver" />
          <li>{car.fuel}</li>
          <li aria-hidden className="h-1 w-1 rounded-full bg-silver" />
          <li>{car.transmission}</li>
        </ul>

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-4 border-t border-hairline pt-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Pris</p>
              <p className="mt-1 text-[26px] leading-none font-semibold tracking-tight text-foreground">
                {formatPrice(car.priceNok)}
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
