import { formatCurrency } from "@/lib/formatter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi2";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  category: string;
  discount: number;
  imagePath: string;
};

export default function ProductCard({
  id,
  name,
  priceInCents,
  discount,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="relative flex border-none shadow-none overflow-hidden flex-col group">
      <div className="relative mb-4 w-full h-full">
        <Link href={`/IdProduct/${id}`}>
          {/* here i marked */}
          <Image src={imagePath} width={1000} height={1000} alt={name} />
        </Link>
        <div>
          <div className="logo opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 ml-4">
            <Image
              src="/kiweM.png"
              className="w-20 z-10"
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <Button className="absolute bottom-4 right-4 p-3 bg-white hover:bg-white hover:shadow-md border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={`/products/${id}/purchase`}>
              <HiOutlineShoppingBag color="black" />
            </Link>
          </Button>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="uppercase text-xl text-center font-sans font-semibold">
          {name}
        </CardTitle>
        <div className="flex space-x-2 mt-2 justify-center">
          <CardDescription className="text-red-600 text-base font-sans">
            From {formatCurrency(priceInCents)}
          </CardDescription>
          <CardDescription className="text-zinc-900 line-through text-base font-sans">
            {formatCurrency(discount)}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col animate-pulse">
      <div className="w-full bg-gray-300 aspect-video"></div>
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
