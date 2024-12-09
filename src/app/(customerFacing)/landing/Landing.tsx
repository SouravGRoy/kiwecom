import React from "react";
import Image from "next/image"; // Assuming you're using Next.js
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="relative size-full">
        <Image
          src="/banner1.jpg"
          alt="Landing"
          width={2000}
          height={2000}
          className="size-full  object-cover w-full h-[60vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-background ">
          <h1 className="max-w-3xl text-balance text-3xl font-bold uppercase md:text-5xl lg:text-5xl">
            Pieces to keep forever
          </h1>

          <p className="max-w-xl text-balance  text-background/80 md:text-lg lg:max-w-3xl lg:text-xl mb-4">
            Jewelry is a lot like love, it&apos;s good idea but expensive
          </p>

          <Button
            size="lg"
            className="mt-5  bg-background/60 font-semibold uppercase text-foreground rounded-none hover:bg-background/90 md:mt-4 md:py-5"
          >
            <Link href="#">Read More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
