"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart-slice";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Use the updated Product type based on your Prisma schema
interface Product {
  id: string;
  name: string;
  discount: number;
  priceInCents: number;
  filePath: string;
  imagePath: string;
  description: string;
  isAvailableForPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: string;
}

interface CartComponentProps {
  product: Product;
}

const CartComponent: React.FC<CartComponentProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const { data: session } = useSession();

  const handleAddToCart = () => {
    if (session?.user) {
      const newCartItem = {
        ...product,
        quantity,
        createdAt: product.createdAt.toISOString(), // Convert Date to string
        updatedAt: product.updatedAt.toISOString(), // Convert Date to string
      };
      console.log("Adding item to cart:", newCartItem);
      dispatch(addToCart(newCartItem));

      if (typeof window !== "undefined") {
        const userId = session.user.id as string;
        const currentCart = JSON.parse(
          localStorage.getItem(`cart-${userId}`) || "[]"
        );
        const updatedCart = [...currentCart, newCartItem];
        localStorage.setItem(`cart-${userId}`, JSON.stringify(updatedCart));
        console.log("Updated Cart in localStorage: ", updatedCart);
      }
    } else {
      console.log("User not logged in.");
    }
  };

  return (
    <div className="flex flex-col md:space-y-5">
      <h1 className="mb-1 text-md font-semibold text-gray-500">Quantity:</h1>
      <div className="flex flex-row mb-4 items-center space-x-4 md:space-x-6">
        <Button
          className="md:py-5 md:px-5"
          variant={"destructive"}
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity === 1}
        >
          <FaMinus />
        </Button>
        <h1 className="md:text-xl text-lg font-bold">{quantity}</h1>
        <Button
          variant={"default"}
          className="md:py-5 md:px-5"
          onClick={() => setQuantity(quantity + 1)}
        >
          <FaPlus />
        </Button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"default"}
              className="md:text-xl text-md font-semibold border-black px-20 py-7 md:w-auto w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </PopoverTrigger>
          {!session && (
            <PopoverContent className="mr-8 p-1 w-48">
              <h1 className="text-3xl text-red-500 font-bold">
                You&apos;re not logged in
              </h1>
              <Button
                onClick={() => signIn("google")}
                className="border border-black rounded-lg"
              >
                Sign in with Google
              </Button>
            </PopoverContent>
          )}
        </Popover>
        <Link href={"/cart"}>
          <Button
            variant="outline"
            className="md:text-xl text-md font-semibold border-black px-20 py-7 md:w-auto w-full"
          >
            Buy it Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartComponent;
