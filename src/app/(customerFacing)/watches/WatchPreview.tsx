import React from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Static watches data
type Product = {
  id: string;
  name: string;
  priceInCents: number;
  discount: number;
  imagePath: string;
};

const watches: Product[] = [
  {
    id: "1",
    name: "9ct White Diamond Flower Stud Earrings",
    priceInCents: 2500,
    discount: 1698,
    imagePath: "/e1.jpg",
  },
  {
    id: "2",
    name: "9ct Yellow Gold 13mm Hoop Earrings",
    priceInCents: 3200,
    discount: 333,
    imagePath: "/e2.jpg",
  },
  {
    id: "3",
    name: "9ct Yellow Pearl Stud Earrings",
    priceInCents: 7500,
    discount: 2768,
    imagePath: "/e3.jpg",
  },
  {
    id: "4",
    name: "Silver Double Wire Hoop Earrings",
    priceInCents: 1500,
    discount: 787,
    imagePath: "/e4.jpg",
  },
];

const WatchPreview: React.FC = () => {
  return (
    <div>
      <div className="space-y-4 px-3">
        <div className="flex gap-4 mt-6 items-center justify-center">
          <h2 className="md:text-[5.9vh] text-3xl tracking-tighter uppercase">
            Earings
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:px-8 px-1 gap-4">
          {watches.map((product) => (
            <ProductCard category={""} key={product.id} {...product} />
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
