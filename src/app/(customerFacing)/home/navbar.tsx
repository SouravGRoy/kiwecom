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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
    <div>
      <div className="dark:from-background bg-gradient-to-r from-secondary shadow-sm dark:to-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-5 md:py-2">
          {/* Logo */}
          <Link href={"/"} className="flex items-center md:space-x-2">
            <h1 className=" text-xl">Vishal Alankar Jewellers</h1>
          </Link>
          {/* Links */}
          <div className="hidden space-x-12 font-semibold lg:flex">
            <Link
              href="/aboutUs"
              className="text-black hover:underline active:text-primary"
            >
              About
            </Link>
            <Link
              href="/coursesUs"
              className="text-black hover:underline active:text-primary"
            >
              Shop
            </Link>
            <Link
              href="/servicesUs"
              className="text-black hover:underline active:text-primary"
            >
              Services
            </Link>

            <Link
              href="/testimonialUs"
              className="text-black hover:underline active:text-primary"
            >
              Blogs
            </Link>
          </div>
          {/* Icons */}
          <div className="flex items-center md:space-x-2">
            <Link
              className="flex rounded-xl px-2 py-1 shadow-md transition duration-500 hover:shadow-xl"
              href={"/contactUs"}
            >
              {" "}
              <h1 className="mx-1 text-xs md:text-base">Contact Us:</h1>
            </Link>
          </div>
        </div>
      </div>
      <motion.div
        className={`bg-black w-full fixed z-[10] text-white px-2 lg:px-10 py-6 font-barlow flex justify-between items-center ${
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
          {/* Logo for large screens */}
          <div className="hidden md:block">
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

          {/* Logo for small screens */}
          <div className="md:hidden mt-3">
            <Link href="/" className="flex">
              <h1 className="font-['NeueMontreal-Regular'] z-20 font-semibold text-3xl">
                kíwë
              </h1>
              <Image
                src="/LOGOX.png"
                className="-ml-6 z-10"
                width={50}
                height={30}
                alt="logo"
              />
            </Link>
          </div>
        </div>

        <div className="items-center px-2 mt-2 flex links gap-6">
          <Button
            onClick={toggleCart}
            className="p-0 hover:bg-none hidden md:block bg-black m-0 relative"
            aria-label="View cart"
          >
            <HiOutlineShoppingBag size={22} />

            <div className="rounded-full absolute top-0 px-1 left-3 bg-zinc-900 flex justify-center text-white"></div>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
