"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // You can replace this with any icon

// Define the props for the component
interface ProductDetailsPageProps {
  description: string;
}

export default function AccordianPage({
  description,
}: ProductDetailsPageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-b border-gray-300 mt-16">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer p-4"
      >
        <h2 className="font-bold text-xl">Description</h2>
        <div className="bg-gray-200 rounded-full ">
          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <p className="px-4 py-6 text-gray-700">{description}</p>
      </motion.div>
    </div>
  );
}
