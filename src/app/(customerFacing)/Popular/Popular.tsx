import React from "react";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import db from "@/db/db"; // Import your Prisma client

// Infer Product type from Prisma client
type Product = Awaited<ReturnType<typeof db.product.findMany>>[number];

type ProductGridSectionProps = {
  title: string;
  productFetcher: () => Promise<Product[]>;
};

export default function Popular({
  productFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div>
      <div className="space-y-4 px-3">
        <div className="flex gap-4 items-center  justify-center">
          <h2 className="md:text-[5.9vh] text-3xl tracking-tighter uppercase">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:px-8 px-1  gap-4">
          <Suspense
            fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
          >
            <ProductSuspense productFetcher={productFetcher} />
          </Suspense>
        </div>
      </div>
      <div className="flex mt-14 items-center justify-center">
        <Button
          variant="outline"
          className="border-zinc-900 px-8 hover:shadow-md py-4 border-2"
          asChild
        >
          <Link href="/products" className="space-x-2  my-10">
            <span className="text-base">View All</span>
            {/* <ArrowRight className="size-4" /> */}
          </Link>
        </Button>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productFetcher,
}: {
  productFetcher: () => Promise<Product[]>;
}) {
  const products = await productFetcher();
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
