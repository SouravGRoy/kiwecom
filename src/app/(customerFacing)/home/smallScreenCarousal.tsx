"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const images = [
  { src: "/demo1.webp", alt: "SHIRTS", href: "/shirts" },
  { src: "/demo2.webp", alt: "SNEAKERS", href: "/sneakers" },
  { src: "/demo3.webp", alt: "WATCHES", href: "/watches" },
  { src: "/demo4.webp", alt: "TSHIRTS", href: "/tshirts" },
  { src: "/demo5.webp", alt: "ACCESSORIES", href: "/accessories" },
  { src: "/demo6.webp", alt: "JACKETS", href: "/jackets" },
  { src: "/demo7.webp", alt: "CARE", href: "/care" },
  { src: "/demo8.webp", alt: "GIFT CARD", href: "/giftcard" },
];
export function SmallScreenCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length - 1;

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

  const progressWidth = ((currentIndex + 1) / images.length) * 100;

  return (
    <div className="block md:hidden w-full px-6 overflow-hidden">
      <motion.div
        className="flex space-x-4"
        style={{ x: `-${currentIndex * 60}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 50 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2} // Makes it more responsive to touch drag
        onDragEnd={(event, info) => {
          // Detect swipe direction and move carousel accordingly
          if (info.offset.x < -50 && currentIndex < totalSlides) {
            handleNext();
          } else if (info.offset.x > 50 && currentIndex > 0) {
            handlePrev();
          }
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="min-w-[60%] h-full flex items-center justify-center relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={800}
              className="rounded-lg"
            />
            <div className="text-center absolute bottom-10 text-white text-2xl">
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
