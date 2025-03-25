"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterToggleButton({
  showFilters,
}: {
  showFilters: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("showFilters", (!showFilters).toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={toggleFilters}
    >
      <SlidersHorizontal className="h-4 w-4" />
      {showFilters ? "Hide Filters" : "Show Filters"}
    </Button>
  );
}
