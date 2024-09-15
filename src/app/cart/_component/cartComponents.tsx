"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart-slice";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
        updatedAt: product.updatedAt.toISOString(), // Convert Date to string if you have this field
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
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row mb-4 items-center space-x-6">
        <Button
          className="py-5 px-5"
          variant={"destructive"}
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity === 1}
        >
          <FaMinus />
        </Button>
        <h1 className="text-xl font-bold">{quantity}</h1>
        <Button
          variant={"default"}
          className="py-5 px-5"
          onClick={() => setQuantity(quantity + 1)}
        >
          <FaPlus />
        </Button>
      </div>
      <div className="flex  space-x-4 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"default"}
              className="text-xl font-semibold border-black px-20 py-7"
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
            className="text-xl justify-end font-semibold border-black px-20 py-7"
          >
            Buy it Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartComponent;
