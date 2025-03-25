"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import VehicleTypeCard from "./vehicle-type-card";

export default function VehicleTypeSection() {
  const vehicleTypes = [
    {
      type: "Henkilöautokurssi (B)",
      imageUrl:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&q=80",
      description:
        "Learn to drive cars with expert instructors and comprehensive courses.",
    },
    {
      type: "Moottoripyöräkurssi (A)",
      imageUrl:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300&q=80",
      description:
        "Master motorcycle riding with specialized training and safety courses.",
    },
    {
      type: "Kuorma-autokurssi (C)",
      imageUrl:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=300&q=80",
      description:
        "Get commercial truck driving certification with professional CDL training.",
    },
    {
      type: "Kevarikurssi (A1)",
      imageUrl:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=300&q=80",
      description:
        "Learn to ride light motorcycles with our specialized training courses.",
    },
    {
      type: "Moottoripyöräkurssi (A2)",
      imageUrl:
        "https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=300&q=80",
      description:
        "Get certified for medium-powered motorcycles with our expert instructors.",
    },
    {
      type: "Mopokurssi (AM120)",
      imageUrl:
        "https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?w=300&q=80",
      description:
        "Learn to ride mopeds safely with our comprehensive training program.",
    },
  ];

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Choose Your Vehicle Type
            </h2>
            <p className="text-gray-600">
              Select the type of vehicle you want to learn to drive
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 pb-4 pt-2 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            ref={carouselRef}
          >
            {vehicleTypes.map((vehicle) => (
              <div key={vehicle.type} className="flex-shrink-0 w-[300px]">
                <VehicleTypeCard
                  type={
                    vehicle.type as
                      | "Henkilöautokurssi (B)"
                      | "Moottoripyöräkurssi (A)"
                      | "Kuorma-autokurssi (C)"
                      | "Kevarikurssi (A1)"
                      | "Moottoripyöräkurssi (A2)"
                      | "Mopokurssi (AM120)"
                  }
                  imageUrl={vehicle.imageUrl}
                  description={vehicle.description}
                />
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
      </div>
    </section>
  );
}
