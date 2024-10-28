"use client";

import { LargeScreenCarousel } from "./carousal";
import { SmallScreenCarousel } from "./smallScreenCarousal";

export default function Carousel() {
  return (
    <>
      <LargeScreenCarousel />
      <SmallScreenCarousel />
    </>
  );
}
