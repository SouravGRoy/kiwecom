import React from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import db from "@/db/db";

// Define the Product type by inferring from the db.product.findMany() call
type Product = Awaited<ReturnType<typeof db.product.findMany>>[number];

async function getSneakers(): Promise<Product[]> {
  return db.product.findMany({
    where: { category: "SNEAKERS", isAvailableForPurchase: true },
  });
}

export default async function SneakerPage() {
  const sneakers = await getSneakers();

  return (
    <div>
      <div className="space-y-4 px-3">
        <div className="flex gap-4 items-center justify-center">
          <h2 className="text-[5.9vh] tracking-tighter uppercase">Sneakers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:px-8 px-1  gap-4">
          {sneakers.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className="flex mt-14 items-center justify-center">
        <Button
          variant="outline"
          className="border-zinc-900 px-8 hover:shadow-md py-4 border-2"
          asChild
        >
          <Link href="/products" className="space-x-2">
            <span className="text-base">View All</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
