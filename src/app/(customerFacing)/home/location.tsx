import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Location() {
  return (
    <div className="py-10">
      <div className="logo  flex flex-col items-center justify-center mb-8">
        <Link href="/" className="flex">
          <h1 className="font-['NeueMontreal-Regular'] z-20 font-semibold text-6xl">
            kíwë
          </h1>
          <Image
            src="/LOGOX.png"
            className="-ml-6 z-10"
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
        <h1 className="text-base font-bold -mt-3 uppercase">Experience</h1>
      </div>
      <div className="flex space-x-6 mb-10 px-10">
        <Image
          src="/location2.webp"
          className="w-full rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          width={500}
          height={1000}
          alt="location"
        />
        <Image
          src="/location1.webp"
          className="w-full rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          width={500}
          height={1000}
          alt="location"
        />
      </div>
    </div>
  );
}
