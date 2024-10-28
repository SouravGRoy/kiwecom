import React from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import db from "@/db/db"; // Assuming you're using Prisma with a db instance

// Infer the Product type dynamically
type Product = Awaited<ReturnType<typeof db.product.findMany>>[number];

interface WatchPreviewProps {
  watches: Product[];
}

const WatchPreview: React.FC<WatchPreviewProps> = ({ watches }) => {
  return (
    <div>
      <div className="space-y-4 px-3">
        <div className="flex gap-4 mt-6  items-center justify-center">
          <h2 className="md:text-[5.9vh]  text-3xl tracking-tighter uppercase">
            Watches
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:px-8 px-1  gap-4">
          {watches.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className="flex my-14 items-center justify-center">
        <Button
          variant="outline"
          className="border-zinc-900 px-8 hover:shadow-md py-4 border-2"
          asChild
        >
          <Link href="/watches" className="space-x-2">
            <span className="text-base">View All</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default WatchPreview;
