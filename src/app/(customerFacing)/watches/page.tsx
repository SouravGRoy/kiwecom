import React from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Static watches data
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

const WatchPage: React.FC = () => {
  return (
    <div>
      <div className="space-y-4 px-3">
        <div className="flex gap-4 mt-8 items-center justify-center">
          <h2 className="text-[5.9vh] tracking-tighter uppercase">Watches</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:px-8 px-1 gap-4">
          {watches.map((product) => (
            <ProductCard discount={0} key={product.id} {...product} />
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

export default WatchPage;
