"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import SchoolCard, { SchoolCardProps } from "./school-card";

interface FeaturedSchoolsCarouselProps {
  schools: SchoolCardProps[];
}

export default function FeaturedSchoolsCarousel({
  schools,
}: FeaturedSchoolsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  if (!schools || schools.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">
        No featured schools available at the moment.
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 pb-4 pt-2 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={carouselRef}
      >
        {schools.map((school) => (
          <div key={school.id} className="flex-shrink-0 w-[300px]">
            <SchoolCard {...school} />
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-md z-10"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-md z-10"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
