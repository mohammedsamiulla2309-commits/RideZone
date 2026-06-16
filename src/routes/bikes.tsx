import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/bikes")({
  head: () => ({
    meta: [
      { title: "Bikes — RideZone Motors" },
      { name: "description", content: "Browse all motorcycles: Royal Enfield, TVS Apache, Bajaj Pulsar and more at RideZone Motors." },
    ],
  }),
  component: BikesPage,
});

function BikesPage() {
  const bikes = products.filter((p) => p.type === "bike");
  return (
    <Layout>
      <PageHeader title="Explore Our Bikes" subtitle="From cruisers to sport machines — find a bike built for your road." />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bikes.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </Layout>
  );
}
