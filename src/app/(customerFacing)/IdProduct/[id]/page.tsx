"use server";

import { PrismaClient } from "@prisma/client"; // Correct Prisma import
import Image from "next/image";
import { formatCurrency } from "@/lib/formatter";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import AccordianPage from "../Accordian";
import Sugesstion from "../Suggestion/suggestion";
import { Button } from "@/components/ui/button";
import { cache } from "@/lib/cache";

import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import CartComponent from "@/app/cart/_component/cartComponents";
import { useSession } from "next-auth/react";

// Initialize Prisma Client
const db = new PrismaClient();

const getMostPopularProduct = cache(
  async (): Promise<any[]> => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 8,
    });
  },
  ["/", "getMostPopularProduct"],
  { revalidate: 60 * 60 * 24 }
);

export default async function ProductDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
  });
  const popularProducts = await getMostPopularProduct();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mx-auto my-16">
      <Card className="border-none shadow-none">
        <div className="flex gap-4 w-full">
          <div className="w-1/2 px-12">
            <Image
              src={product.imagePath}
              width={1000}
              height={1000}
              alt={product.name}
              className="w-full"
            />
          </div>
          <div className="w-1/2 px-10">
            <div>
              <h1 className="text-lg font-helvetica mb-3 text-gray-400 font-bold">
                Kíwë Media / {product.category}
              </h1>
              <h1 className="text-[3.4vw] uppercase font-founders">
                {product.name}
              </h1>

              <div className="flex space-x-4 font-sans flex-row">
                <h1 className="text-2xl">
                  {formatCurrency(product.priceInCents / 100)}
                </h1>
                {product.discount && (
                  <h1 className="text-2xl line-through text-red-600">
                    {formatCurrency(product.discount / 100)}
                  </h1>
                )}
              </div>

              <h1 className="text-gray-600 text-base">Incl. of all taxes</h1>
              <div className="my-10 flex flex-row space-x-4">
                <CartComponent product={product} />
              </div>
              <AccordianPage description={product.description} />
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <h1 className="text-lg font-helvetica text-gray-700">Share</h1>
              <Link href="https://www.facebook.com">
                <FaFacebookF size={20} color="grey" />
              </Link>
              <Link href="https://www.instagram.com">
                <FaInstagram size={20} color="grey" />
              </Link>
              <Link href="https://www.twitter.com">
                <FaXTwitter size={20} color="grey" />
              </Link>
              <Link href="https://www.pinterest.com">
                <FaPinterestP size={20} color="grey" />
              </Link>
            </div>
          </div>
        </div>
      </Card>
      <div className="py-28">
        <Sugesstion products={popularProducts} />
      </div>
    </div>
  );
}
