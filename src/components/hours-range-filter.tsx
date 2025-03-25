"use client";

import { useState } from "react";
import { Slider } from "./ui/slider";

interface HoursRangeFilterProps {
  title: string;
  min?: number;
  max?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
}

export default function HoursRangeFilter({
  title,
  min = 0,
  max = 50,
  value = [min, max],
  onChange,
}: HoursRangeFilterProps) {
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
      <h3 className="font-medium text-sm">{title}</h3>

      <Slider
        defaultValue={range}
        min={min}
        max={max}
        step={1}
        onValueChange={handleChange}
        className="my-6"
      />

      <div className="flex justify-between items-center">
        <div className="bg-gray-50 px-3 py-1 rounded text-sm">
          {range[0]} hours
        </div>
        <div className="text-gray-400 text-xs">to</div>
        <div className="bg-gray-50 px-3 py-1 rounded text-sm">
          {range[1]} hours
        </div>
      </div>
    </div>
  );
}
