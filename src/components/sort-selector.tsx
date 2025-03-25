"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortOption = "price-asc" | "price-desc";

interface SortSelectorProps {
  value?: SortOption;
  onChange?: (value: SortOption) => void;
}

export default function SortSelector({
  value = "price-asc",
  onChange,
}: SortSelectorProps) {
  const [selected, setSelected] = useState<SortOption>(value);

  const handleChange = (newValue: SortOption) => {
    setSelected(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm mb-3">Sort By</h3>
      <Select
        value={selected}
        onValueChange={(value) => handleChange(value as SortOption)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
