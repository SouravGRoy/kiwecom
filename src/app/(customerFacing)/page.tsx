import React from "react";
import LandingPage from "./landing/Landing";
import Popular from "./Popular/Popular";
import TopPicks from "./home/topPicks";
import Newest from "./Newest/Newest";
import CDC from "./home/cdcSelect";
import WatchPreview from "./watches/WatchPreview";
import Carousel from "./home/mainCarousal";

// Static product data
type Product = {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  isAvailableForPurchase: boolean;
  category: string;
};

const watches: Product[] = [
  {
    id: "1",
    name: "Classic Watch",
    priceInCents: 2500,
    imagePath: "/images/watch1.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "2",
    name: "Sport Watch",
    priceInCents: 3200,
    imagePath: "/images/watch2.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "3",
    name: "Luxury Watch",
    priceInCents: 7500,
    imagePath: "/images/watch3.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "4",
    name: "Digital Watch",
    priceInCents: 1500,
    imagePath: "/images/watch4.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
];

const mostPopularProducts: Product[] = [
  {
    id: "5",
    name: "Popular Watch 1",
    priceInCents: 5000,
    imagePath: "/images/popular1.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "6",
    name: "Popular Watch 2",
    priceInCents: 5500,
    imagePath: "/images/popular2.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "7",
    name: "Popular Watch 3",
    priceInCents: 6000,
    imagePath: "/images/popular3.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "8",
    name: "Popular Watch 4",
    priceInCents: 6500,
    imagePath: "/images/popular4.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
];

const newestProducts: Product[] = [
  {
    id: "9",
    name: "Newest Watch 1",
    priceInCents: 7000,
    imagePath: "/images/newest1.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "10",
    name: "Newest Watch 2",
    priceInCents: 7500,
    imagePath: "/images/newest2.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "11",
    name: "Newest Watch 3",
    priceInCents: 8000,
    imagePath: "/images/newest3.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
  {
    id: "12",
    name: "Newest Watch 4",
    priceInCents: 8500,
    imagePath: "/images/newest4.jpg",
    isAvailableForPurchase: true,
    category: "WATCHES",
  },
];

export default function Homepage() {
  return (
    <main className="space-y-12">
      <LandingPage />
      <Popular />
      <Carousel />
      <TopPicks />
      <Newest />
      <CDC />
      <WatchPreview />
    </main>
  );
}
