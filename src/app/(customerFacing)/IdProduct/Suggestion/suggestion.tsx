"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Product } from "../../../../../types/types"; // Correct path
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CarouselProps {
  products: Product[];
}

export default function Suggestion({ products }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 2;
  const totalSlides = products.length - itemsToShow;

  const handleNext = () => {
    if (currentIndex < totalSlides) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progressWidth = ((currentIndex + itemsToShow) / products.length) * 100;

  return (
    <div className="w-full px-12 overflow-hidden">
      <h1 className="text-4xl">You may also like</h1>
      <motion.div
        className="flex space-x-4"
        style={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 50,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="min-w-[33%] flex items-center justify-center relative group"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              priceInCents={product.priceInCents}
              discount={product.discount}
              imagePath={product.imagePath}
              category={product.category}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center justify-between mt-6">
        <motion.div
          className="h-1 bg-blue-500"
          style={{ width: `${progressWidth}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressWidth}%` }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        <div className="flex space-x-4 items-center">
          <Button
            onClick={handlePrev}
            className="rounded-full px-4 py-6"
            variant="outline"
            disabled={currentIndex === 0}
          >
            <IoIosArrowBack size={18} />
          </Button>
          <Button
            onClick={handleNext}
            className="rounded-full px-4 py-6"
            variant="outline"
            disabled={currentIndex >= totalSlides}
          >
            <IoIosArrowForward size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
