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

export default function Popular() {
  // Static products object
  const products: Product[] = [
    {
      id: "1",
      name: "18ct Yellow & White Pear Cut Diamond Ring",
      priceInCents: 906,
      imagePath: "/pp6.jpg",
      discount: 964,
    },
    {
      id: "2",
      name: "18ct Yellow Gold Baroque Pearl Stud Earrings",
      priceInCents: 1800,
      imagePath: "/pp3.jpg",
      discount: 1000,
    },
    {
      id: "3",
      name: "9ct Yellow Gold 13mm Hoop Earrings",
      priceInCents: 2200,
      imagePath: "/pp5.jpg",
      discount: 1000,
    },
    {
      id: "4",
      name: "9ct Yellow Gold Bezel Set Pendant & Earring Set",
      priceInCents: 3000,
      imagePath: "/pp7.jpg",
      discount: 1000,
    },
  ];

  return (
    <div>
      <div className="space-y-4 px-3">
        <div className="flex gap-4 items-center justify-center">
          <h2 className="md:text-[5.9vh] text-3xl tracking-tighter uppercase">
            Popular Products
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
          <Link href="/products" className="space-x-2 my-10">
            <span className="text-base">View All</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
