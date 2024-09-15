"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateCart, removeFromCart } from "@/redux/features/cart-slice";
import { Button } from "@/components/ui/button";
import Navbar from "../(customerFacing)/home/navbar";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { BsBoxSeam } from "react-icons/bs";
import Link from "next/link";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);

  const incrementCartItem = (id: string) => {
    dispatch(
      updateCart(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    );
  };

  const decrementCartItem = (id: string) => {
    dispatch(
      updateCart(
        cartItems.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      )
    );
  };

  const removeCartItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.priceInCents * item.quantity,
      0
    );
  };

  return (
    <>
      <Navbar />

      <div className="py-44 px-8 h-screen">
        <h1 className="text-center text-5xl uppercase mb-12">Cart</h1>
        <div className="flex gap-12 pt-6 px-8">
          <div className="w-3/4">
            <table className="w-full border-collapse">
              <thead className="border-b font-mono">
                <tr>
                  <th className="text-left pb-4">Product</th>
                  <th className="text-center pb-4">Quantity</th>
                  <th className="text-right pb-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-8">
                      <div className="flex items-center space-x-4">
                        <Image
                          width={50}
                          height={50}
                          src={item.imagePath}
                          alt={item.name}
                          className="w-24 h-20 object-cover"
                        />
                        <div>
                          <p className="font-semibold uppercase text-xl text-black">
                            {item.name}
                          </p>
                          <p className="text-lg font-normal text-gray-600">
                            {item.category}
                          </p>
                          <p className="text-xl font-semibold  text-gray-700">
                            ₹{item.priceInCents}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex flex-col items-center justify-center space-x-2 space-y-4">
                        <div className="flex space-x-4 flex-row justify-between">
                          <Button
                            onClick={() => decrementCartItem(item.id)}
                            disabled={item.quantity === 1}
                            variant={"outline"}
                            className="bg-gray-300 text-black px-4 py-1"
                          >
                            -
                          </Button>
                          <span className="text-center flex justify-center items-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant={"outline"}
                            onClick={() => incrementCartItem(item.id)}
                            className="bg-gray-300 text-black px-4 py-1"
                          >
                            +
                          </Button>
                        </div>

                        <Button
                          variant={"link"}
                          onClick={() => removeCartItem(item.id)}
                          className="ml-4 h-0 p-0 text-md hover:bg-white underline text-red-600"
                        >
                          Remove
                        </Button>
                      </div>
                    </td>
                    <td className="py-4 text-zinc-700 text-lg  text-right">
                      ₹{item.priceInCents * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <AccordianCart />
            </div>
          </div>
          <div className="w-1/4">
            <div className="border flex space-y-3 flex-col justify-between p-4 mb-4">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold ">Subtotal</h2>
                <p className="text-lg">₹{calculateTotal()}</p>
              </div>
              <div className="flex justify-between pb-6">
                <h2 className="text-xl font-bold ">Total</h2>
                <p className="text-xl">₹{calculateTotal()}</p>
              </div>
              <p className="pr-4 ">
                Tax included and shipping calculated at checkout
              </p>
            </div>
            <div className="mt-4 w-full flex justify-center bg-black text-white py-3">
              <Link href={`/products/${cartItems[0]?.id}/purchase`}>
                Checkout
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="https://github.com/SouravGRoy"
                className="text-sm underline"
              >
                Have a gift card?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;

function AccordianCart() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" border-b border-gray-300 mt-">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer p-4"
      >
        <div className="flex items-center  space-x-2">
          <BsBoxSeam size={22} />
          <h2 className="font-semibold  text-xl">Estimate Shipping</h2>
        </div>

        <div className="bg-black text-white p-1 rounded-full ">
          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden flex-col flex space-x-4 my-2"
      >
        <div className="flex gap-8">
          <Button
            className="flex flex-col w-full py-6 px-6 shadow-sm"
            variant={"secondary"}
          >
            <p className="text-xs text-gray-400">Country</p>
            <h1 className="text-md font-bold">India</h1>
          </Button>
          <Button
            className="flex flex-col py-6 w-full px-6 shadow-sm"
            variant={"secondary"}
          >
            <p className="text-xs text-gray-400">Province</p>
            <h1 className="text-md font-bold">Siliguri</h1>
          </Button>
          <Button
            className="flex flex-col w-full py-6 px-6 shadow-sm"
            variant={"secondary"}
          >
            <p className="text-xs text-gray-400">Zip code</p>
            <h1 className="text-md font-bold">734003</h1>
          </Button>
        </div>
        <div>
          <p className="mt-8 font-bold mb-2 text-gray-700">
            There are several shipping rates for your address:
          </p>
          <ul>
            Standard Shipping: INR 500.00
            <li>Instant Shipping: INR 1500.00</li>
            <li></li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
