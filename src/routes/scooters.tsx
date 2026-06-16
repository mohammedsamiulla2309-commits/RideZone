import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/scooters")({
  head: () => ({
    meta: [
      { title: "Scooters — RideZone Motors" },
      { name: "description", content: "Honda Activa, TVS Jupiter and India's best scooters with top mileage and easy EMI." },
    ],
  }),
  component: ScootersPage,
});

function ScootersPage() {
  const list = products.filter((p) => p.type === "scooter");
  return (
    <Layout>
      <PageHeader title="Browse Our Scooters" subtitle="Effortless city rides, supreme mileage, and stylish designs." />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </Layout>
  );
}
