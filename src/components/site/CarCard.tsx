import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Car } from "@/lib/cars";
import { formatKm, formatPrice } from "@/lib/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/biler/$id"
      params={{ id: car.id }}
      className="group block rounded-2xl overflow-hidden bg-card border border-hairline shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={car.image}
          alt={car.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand}</p>
            <h3 className="mt-1 text-lg font-semibold text-foreground truncate">{car.model}</h3>
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <li>{car.year}</li>
          <li>·</li>
          <li>{formatKm(car.mileageKm)}</li>
          <li>·</li>
          <li>{car.fuel}</li>
          <li>·</li>
          <li>{car.transmission}</li>
        </ul>

        <div className="mt-6 flex items-end justify-between border-t border-hairline pt-5">
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {formatPrice(car.priceNok)}
          </p>
          <span className="text-sm font-medium text-brand group-hover:underline underline-offset-4">
            Se bilen
          </span>
        </div>
      </div>
    </Link>
  );
}
