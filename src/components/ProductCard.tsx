import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, ArrowRight } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
      {p.tag && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-gradient-red px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          {p.tag}
        </span>
      )}
      <div className="aspect-[4/3] overflow-hidden bg-white">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider text-primary">
          {p.category}
        </div>
        <h3 className="mt-1 font-display text-2xl tracking-wide">{p.name}</h3>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-primary" /> {p.mileage}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-primary" /> {p.engine}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Starting at
            </div>
            <div className="font-display text-2xl text-foreground">
              {formatPrice(p.price)}
            </div>
          </div>
          <Link
            to="/test-ride"
            className="flex items-center gap-1 rounded-md border border-primary px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View Details <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
