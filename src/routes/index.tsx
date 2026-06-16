import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bike, Zap, Award, Shield, Star, Quote } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { FilloutEmbed } from "@/components/FilloutEmbed";
import { products } from "@/data/products";
import hero from "@/assets/hero-bike.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RideZone Motors — Find Your Perfect Ride" },
      { name: "description", content: "Explore the latest bikes and scooters at the best prices. EMI options, test rides, and India's top brands." },
      { property: "og:title", content: "RideZone Motors — Premium Bikes & Scooters" },
      { property: "og:description", content: "Explore the latest bikes and scooters at the best prices." },
    ],
  }),
  component: Home,
});

const categories = [
  { name: "Sports Bikes", icon: Zap, count: "12+ Models" },
  { name: "Commuter Bikes", icon: Bike, count: "18+ Models" },
  { name: "Cruiser Bikes", icon: Award, count: "8+ Models" },
  { name: "Electric Scooters", icon: Shield, count: "6+ Models" },
];

const reviews = [
  { name: "Arjun Mehta", text: "Best showroom experience! The team helped me pick the perfect Classic 350. EMI was seamless.", rating: 5 },
  { name: "Priya Sharma", text: "Booked my Activa 6G here. Test ride was hassle-free, and the price was unbeatable.", rating: 5 },
  { name: "Rohan Kapoor", text: "RiderBot helped me decide between sports and commuter bikes. Smart team, great service.", rating: 5 },
];

function Home() {
  return (
    <Layout>

      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Star className="h-3 w-3 fill-primary" /> India's #1 Bike Showroom
            </div>
            <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-wide md:text-8xl">
              Find Your <br />
              <span className="text-gradient-red">Perfect Ride</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Explore the latest bikes and scooters at the best prices. Premium brands, unbeatable EMI, instant test rides.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/bikes"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-red px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Browse Bikes <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/test-ride"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Book Test Ride
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { v: "50K+", l: "Happy Riders" },
                { v: "100+", l: "Models" },
                { v: "24/7", l: "Support" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-gradient-red">{s.v}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-red opacity-20 blur-3xl" />
            <img
              src={hero}
              alt="Premium motorcycle"
              width={1920}
              height={1080}
              className="relative rounded-2xl shadow-glow"
            />
          </div>
        </div>
      </section>


      <FilloutEmbed />


      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Categories</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Shop by <span className="text-gradient-red">Style</span></h2>
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <div
              key={c.name}
              className="group cursor-pointer rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-glow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-red shadow-glow">
                <c.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-2xl tracking-wide">{c.name}</h3>
              <div className="mt-1 text-xs text-muted-foreground">{c.count}</div>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Featured</div>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Top Selling <span className="text-gradient-red">Rides</span></h2>
          </div>
          <Link to="/bikes" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-red p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <div className="inline-block rounded-full bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              Limited Time Offer
            </div>
            <h2 className="mt-4 font-display text-4xl text-white md:text-6xl">
              Zero Down Payment
            </h2>
            <p className="mt-3 max-w-xl text-white/90">
              Drive home your dream bike today. EMIs starting at ₹2,499/month with instant approval.
            </p>
            <Link
              to="/emi"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-background px-7 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105"
            >
              Calculate EMI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Testimonials</div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">What Our <span className="text-gradient-red">Riders Say</span></h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <Quote className="h-8 w-8 text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">"{r.text}"</p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="mt-3 font-semibold">{r.name}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
