"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const images = [
  { src: "/product4.jpg", alt: "Minimalist Gold Ring", href: "/shirts" },
  { src: "/product3.webp", alt: "Bridal Jewelry Set", href: "/sneakers" },
  { src: "/product5.webp", alt: "New In Jewellery", href: "/watches" },
  { src: "/product1.webp", alt: "Dainty Chain Bracelet", href: "/tshirts" },
  { src: "/product2.webp", alt: "ACCESSORIES", href: "/accessories" },
  { src: "/product6.webp", alt: "Fine Jewelry Rings", href: "/jackets" },
  { src: "/product7.webp", alt: "Up to 29% discount", href: "/care" },
  { src: "/product8.jpg", alt: "GIFT CARD", href: "/giftcard" },
];

export function LargeScreenCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length - 3;

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

  const progressWidth = ((currentIndex + 3) / images.length) * 100;

  return (
    <div className="hidden md:block w-full px-12 overflow-hidden">
      <motion.div
        className="flex space-x-4"
        style={{ x: `-${currentIndex * 35}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 50 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="min-w-[33%] h-full flex items-center justify-center relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              height={1000}
              className="rounded-lg object-cover w-full h-[500px]"
            />
            <div className="text-center absolute bottom-10 text-white text-4xl font-semibold">
              {image.alt}
            </div>
            <div className="absolute bottom-20 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={image.href}>
                <Button className="rounded-full p-3" variant="outline">
                  <IoIosArrowForward size={14} />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center justify-between">
        <motion.div
          className="h-1 bg-blue-500"
          style={{ width: `${progressWidth}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressWidth}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <div className="flex space-x-4 items-center justify-center py-10">
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
