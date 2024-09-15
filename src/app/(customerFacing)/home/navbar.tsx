"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineBars3 } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import ShoppingCart from "./shoppingCart";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Dashboard from "../../../../components/Dashboard";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const cartArray = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const toggleCart = () => setCartIsOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const links = [
    { name: "What's new", href: "https://kiwemedia.vercel.app/about" },
    { name: "Sneaker", href: "https://kiwemedia.vercel.app/services" },
    { name: "Accessories", href: "https://kiwemedia.vercel.app/work" },
    { name: "Watches", href: "https://kiwemedia.vercel.app/about" },
    { name: "Tshirts", href: "https://kiwemedia.vercel.app/services" },
    { name: "Jewellery", href: "https://kiwemedia.vercel.app/services" },
    { name: "Jackets", href: "https://kiwemedia.vercel.app/services" },
    { name: "Shirts", href: "https://kiwemedia.vercel.app/services" },
    { name: "Apparel", href: "https://kiwemedia.vercel.app/work" },
    { name: "Brands", href: "https://kiwemedia.vercel.app/contact" },
  ];

  return (
    <motion.div
      className={`bg-black w-full fixed z-[10] text-white px-6 lg:px-10 py-6 font-barlow flex justify-between items-center ${
        visible ? "" : "hidden"
      }`}
    >
      <Button
        onClick={toggleMenu}
        className="text-white bg-black focus:outline-none"
        aria-label="Toggle menu"
      >
        <HiOutlineBars3 size={28} />
      </Button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute items-start font-founders font-semibold text-4xl text-zinc-900 left-4 top-4 right-0 bg-[#ffffff] tracking-wide flex flex-col px-8 pr-44 w-fit gap-2 py-8 rounded-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotate: 180 }}
              className="rounded-full border p-3 mt-2 mb-4 cursor-pointer"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <RxCross2 size={18} />
            </motion.div>
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="uppercase"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-5 mb-2 mt-4">
              <FaInstagram size={26} />
              <FaFacebookF size={26} />
              <FaXTwitter size={26} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="logo">
        <Link href="/" className="flex">
          <h1 className="font-['NeueMontreal-Regular'] z-20 font-semibold text-4xl">
            kíwë
          </h1>
          <Image
            src="/LOGOX.png"
            className="-ml-6 z-10"
            width={70}
            height={70}
            alt="logo"
          />
        </Link>
      </div>
      <div className="hidden lg:flex items-center links gap-6">
        <Dashboard />
        <Button
          onClick={toggleCart}
          className="p-0 hover:bg-none bg-black m-0 relative"
          aria-label="View cart"
        >
          <HiOutlineShoppingBag size={22} />
          {cartArray.length > 0 && (
            <div className="rounded-full absolute top-0 px-1 left-3 bg-zinc-900 flex justify-center text-white">
              {cartArray.length}
            </div>
          )}
        </Button>
        <ShoppingCart
          isOpen={cartIsOpen}
          onClose={toggleCart}
          cartItems={cartArray}
        />
      </div>
    </motion.div>
  );
}
