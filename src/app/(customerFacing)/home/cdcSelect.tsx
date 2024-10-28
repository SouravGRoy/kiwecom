"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogOverlay, // Import the Overlay component
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define the Product interface correctly
interface Product {
  name: string;
  src: string;
  price: string;
  originalPrice: string;
}

interface Cdc1Props {
  product: Product;
  position: string;
}
interface Cdc2Props {
  product: Product;
  position: string;
}

function Cdc1({ product, position }: Cdc1Props) {
  return (
    <div className={`absolute ${position} transform -translate-y-1/2`}>
      <div className="relative">
        <motion.div
          className="bg-white opacity-50 rounded-full md:h-14 h-10 w-10 md:w-14 absolute inset-0"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-white md:p-6 p-4 rounded-full h-5 w-5 relative z-10"></div>
          </AlertDialogTrigger>
          <AlertDialogOverlay />
          <AlertDialogContent className="w-fit  p-3 mx-auto bg-[#ffffffb9]  rounded-md shadow-lg">
            <AlertDialogHeader className="text-center">
              <Image
                src={product.src}
                width={300}
                height={300}
                alt={product.name}
                className="w-full rounded-md"
              />
              <p className="text-gray-700 font-semibold md:text-lg underline text-center ">
                {product.name}
              </p>
              <div className="flex justify-center items-baseline space-x-2 mt-2">
                <p className="text-red-600 md:text-lg font-bold">
                  {product.price}
                </p>
                <p className="text-gray-500 line-through">
                  {product.originalPrice}
                </p>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex md:pb-2 justify-center items-center text-center w-full ">
              <AlertDialogCancel className="text-blue-500 hover:text-blue-700">
                Close
              </AlertDialogCancel>
              <Link href={"/products"}>
                <AlertDialogAction className="text-blue-500 hover:text-blue-700 ml-4">
                  Explore
                </AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
function Cdc2({ product, position }: Cdc2Props) {
  return (
    <div className={`absolute ${position} transform -translate-y-1/2`}>
      <div className="relative">
        <motion.div
          className="bg-white opacity-50 rounded-full md:h-14 h-10 w-10 md:w-14 absolute inset-0"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-white p-4 md:p-6 rounded-full h-5 w-5 relative z-10"></div>
          </AlertDialogTrigger>
          <AlertDialogOverlay />
          <AlertDialogContent className="w-fit p-3 mx-auto bg-[#ffffffb9]  rounded-md shadow-lg">
            <AlertDialogHeader className="text-center">
              <Image
                src={product.src}
                width={300}
                height={300}
                alt={product.name}
                className="w-full rounded-md"
              />
              <p className="text-gray-700 font-semibold text-sm md:text-lg underline text-center ">
                {product.name}
              </p>
              <div className="flex justify-center items-baseline space-x-2 mt-2">
                <p className="text-red-600 text-lg font-bold">
                  {product.price}
                </p>
                <p className="text-gray-500 line-through">
                  {product.originalPrice}
                </p>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex pb-2 justify-center text-center w-full ">
              <AlertDialogCancel className="text-blue-500 hover:text-blue-700">
                Close
              </AlertDialogCancel>
              <Link href={"/products"}>
                <AlertDialogAction className="text-blue-500 hover:text-blue-700 ml-4">
                  Explore
                </AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
const CDC1 = [
  {
    name: "Gradient Set 2 Pants (Faded Blue)",
    src: "/cdcPant1.webp",
    price: "₹2,399",
    originalPrice: "₹3,600.00",
  },
  {
    name: "Jordan 1 Low UNC TOE 2023",
    src: "/cdcshoe1.webp",
    price: "₹10,999",
    originalPrice: "₹12,999.00",
  },
  {
    name: "GRADIENT SET 2 TOP (FADED BLUE)",
    src: "/cdcTop1.webp", // Update with the correct path to your image
    price: "₹2,099",
    originalPrice: "₹3,600.00",
  },
];
const CDC2 = [
  {
    name: "PLEATED ARCH CUT PANTS",
    src: "/cdcPant2.webp",
    price: "₹4,490",
    originalPrice: "₹5,600.00",
  },
  {
    name: "Nike Dunk Low Smokey Mauve (W)",
    src: "/cdcShoe2.webp",
    price: "₹5,999",
    originalPrice: "₹6,999.00",
  },
  {
    name: "WARPED PANEL OVERSHIRT",

    src: "/cdcTop2.webp", // Update with the correct path to your image
    price: "₹8,099",
    originalPrice: "₹9,600.00",
  },
];

export default function CDC() {
  const positions = ["top-[55%]", "top-[95%] left-[55%]", "top-[35%]"];

  return (
    <div className="bg-gray-100 py-24">
      <div className="space-y-4 px-3">
        <div className="flex flex-col gap-4 md:mb-20 mb-10 items-center justify-center">
          <h2 className="md:text-[6.6vh] text-3xl tracking-tighter uppercase">
            CDC SELECT
          </h2>
          <p className="md:font-bold font-semibold text-center md:w-1/2">
            Explore curated fits, but never lose sight of authenticity. Find
            complete outfits that reflect your unique style. Shop now!
          </p>
        </div>
        <div className="flex justify-center m items-center md:px-10 px-4 flex-col relative">
          {CDC1.map((product, index) => (
            <Cdc1 key={index} product={product} position={positions[index]} />
          ))}
          <Image
            className="w-full rounded-md"
            width={1000}
            height={1000}
            alt="cdc1"
            src="/cdc1.webp"
          />
        </div>

        <div className="flex pt-12 justify-center items-center md:px-10 px-4 flex-col relative">
          {CDC2.map((product, index) => (
            <Cdc2 key={index} product={product} position={positions[index]} />
          ))}
          <Image
            className="w-full rounded-md"
            width={1000}
            height={1000}
            alt="cdc2"
            src="/cdc2.webp"
          />
        </div>
      </div>
      <div className="flex  mt-14  items-center  justify-center">
        <Button
          variant="outline"
          className="border-zinc-900 px-8 hover:shadow-md py-5 border-2 "
          asChild
        >
          <Link href="/products" className="space-x-2">
            <span className="md:text-lg ">EXPLORE ALL</span>
            {/* <ArrowRight className="size-4" /> */}
          </Link>
        </Button>
      </div>
    </div>
  );
}
