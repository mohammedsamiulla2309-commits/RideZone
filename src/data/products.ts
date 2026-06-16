import classic350 from "@/assets/bike-classic350.jpg";
import apache from "@/assets/bike-apache.jpg";
import pulsar from "@/assets/bike-pulsar.jpg";
import activa from "@/assets/scooter-activa.jpg";
import jupiter from "@/assets/scooter-jupiter.jpg";

export type Product = {
  id: string;
  name: string;
  category: "Sports" | "Commuter" | "Cruiser" | "Electric Scooter" | "Scooter";
  type: "bike" | "scooter";
  price: number;
  mileage: string;
  engine: string;
  image: string;
  tag?: string;
};

export const products: Product[] = [
  {
    id: "classic-350",
    name: "Royal Enfield Classic 350",
    category: "Cruiser",
    type: "bike",
    price: 193000,
    mileage: "35 kmpl",
    engine: "349 cc",
    image: classic350,
    tag: "Best Seller",
  },
  {
    id: "apache-rtr-160",
    name: "TVS Apache RTR 160",
    category: "Sports",
    type: "bike",
    price: 124000,
    mileage: "45 kmpl",
    engine: "159.7 cc",
    image: apache,
    tag: "New Arrival",
  },
  {
    id: "pulsar-n160",
    name: "Bajaj Pulsar N160",
    category: "Sports",
    type: "bike",
    price: 128000,
    mileage: "42 kmpl",
    engine: "164.8 cc",
    image: pulsar,
  },
  {
    id: "activa-6g",
    name: "Honda Activa 6G",
    category: "Scooter",
    type: "scooter",
    price: 81000,
    mileage: "47 kmpl",
    engine: "109.5 cc",
    image: activa,
    tag: "Top Pick",
  },
  {
    id: "tvs-jupiter",
    name: "TVS Jupiter",
    category: "Scooter",
    type: "scooter",
    price: 78000,
    mileage: "50 kmpl",
    engine: "109.7 cc",
    image: jupiter,
  },
];

export const formatPrice = (p: number) =>
  `₹${p.toLocaleString("en-IN")}`;
