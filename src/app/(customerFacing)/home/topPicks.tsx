import Image from "next/image";
import React from "react";

export default function TopPicks() {
  return (
    <div>
      <Image
        width={1000}
        height={1000}
        unoptimized
        alt="image"
        src={"/kiwemedia.gif"}
        className="w-full"
      ></Image>
    </div>
  );
}
