"use client";

import { useState } from "react";
import { Slider } from "./ui/slider";

interface PriceRangeFilterProps {
  min?: number;
  max?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
}

export default function PriceRangeFilter({
  min = 0,
  max = 1000,
  value = [min, max],
  onChange,
}: PriceRangeFilterProps) {
  const [range, setRange] = useState<[number, number]>(value);

  const handleChange = (newValue: number[]) => {
    const newRange: [number, number] = [newValue[0], newValue[1]];
    setRange(newRange);
    if (onChange) {
      onChange(newRange);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm">Price Range</h3>

      <Slider
        defaultValue={range}
        min={min}
        max={max}
        step={10}
        onValueChange={handleChange}
        className="my-6"
      />

      <div className="flex justify-between items-center">
        <div className="bg-gray-50 px-3 py-1 rounded text-sm">${range[0]}</div>
        <div className="text-gray-400 text-xs">to</div>
        <div className="bg-gray-50 px-3 py-1 rounded text-sm">${range[1]}</div>
      </div>
    </div>
  );
}
