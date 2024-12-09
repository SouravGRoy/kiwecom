import React from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  priceInCents: number;
  discount: number;
  imagePath: string;
};

export default function Newest() {
  // Static products object
  const products: Product[] = [
    {
      id: "1",
      name: "9ct Yellow Gold Hinged Bangle",
      priceInCents: 170,
      discount: 100,
      imagePath: "/pp1.webp",
    },
    {
      id: "2",
      name: " 9ct Yellow Pearl 0.04ct Stud Earrings",
      priceInCents: 1500,
      discount: 1080,
      imagePath: "/pp2.webp",
    },
    {
      id: "3",
      name: "Sterling Silver 5mm Torque Bangle",
      priceInCents: 2000,
      discount: 1890,
      imagePath: "/pp3.webp",
    },
    {
      id: "4",
      name: "9ct Yellow Gold Infinity Pendant",
      priceInCents: 1650,
      discount: 130,
      imagePath: "/pp4.webp",
    },
  ];

  return (
    <div>
      <div className="space-y-4 px-3">
        <div className="flex gap-4 items-center justify-center">
          <h2 className="md:text-[5.9vh] text-3xl tracking-tighter uppercase">
            Newest Products
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:px-8 px-1 gap-4">
          {products.map((product) => (
            <ProductCard category={""} key={product.id} {...product} />
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
