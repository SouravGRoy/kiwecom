import React from "react";
import Image from "next/image"; // Assuming you're using Next.js

export default function LandingPage() {
  return (
    <section className="flex w-full items-center justify-center">
      {/* Background Image */}
      <Image
        src="https://crepdogcrew.com/cdn/shop/files/BANNER_WEB_31c7b674-9567-4f0a-aa04-45f4c293f24e.png?v=1723138682&width=2600"
        alt="Landing"
        height={1000}
        width={1000}
        priority
        className="object-cover w-full h-[60vh] sm:h-[60vh] md:h-[70vh] lg:h-[100vh]"
      />
    </section>
  );
}
