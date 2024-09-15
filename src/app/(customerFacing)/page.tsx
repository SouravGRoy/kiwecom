import React from "react";
import LandingPage from "./landing/Landing";
import Popular from "./Popular/Popular";
import Carousel from "./home/carousal";
import TopPicks from "./home/topPicks";
import Newest from "./Newest/Newest";
import CDC from "./home/cdcSelect";
import WatchPreview from "./watches/WatchPreview";
import { cache } from "@/lib/cache";
import db from "@/db/db"; // Server-side Prisma client import

// Infer Product type from the result of the db.product query
type Product = Awaited<ReturnType<typeof db.product.findMany>>[number];

async function getLimitedWatches(): Promise<Product[]> {
  return db.product.findMany({
    where: { category: "WATCHES", isAvailableForPurchase: true },
    take: 4, // Limit to 4 watches
  });
}

const getMostPopularProduct = cache(
  (): Promise<Product[]> => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 4,
    });
  },
  ["/", "getMostPopularProduct"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProduct = cache((): Promise<Product[]> => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
}, ["/", "getNewestProduct"]);

export default async function Homepage() {
  const limitedWatches = await getLimitedWatches();

  return (
    <main className="space-y-12">
      <LandingPage />
      <Popular title="MOST-Popular" productFetcher={getMostPopularProduct} />
      <Carousel />
      <TopPicks />
      <Newest title="Newest" productFetcher={getNewestProduct} />
      <CDC />
      {/* Pass the limited watches to the WatchPreview component */}
      <WatchPreview watches={limitedWatches} />
    </main>
  );
}
