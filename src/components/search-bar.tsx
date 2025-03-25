"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Filter, Car } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SearchBarProps {
  className?: string;
  onSearch?: (location: string, vehicleType: string) => void;
}

export default function SearchBar({
  className = "",
  onSearch,
}: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("Henkilöautokurssi (B)");
  const [cities, setCities] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // In a real app, this would be fetched from an API
    setCities([
      "Helsinki",
      "Espoo",
      "Tampere",
      "Vantaa",
      "Oulu",
      "Turku",
      "Jyväskylä",
      "Lahti",
      "Kuopio",
      "Pori",
    ]);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(location, vehicleType);
    } else {
      // If no onSearch prop, navigate to search page with query params
      const params = new URLSearchParams();
      if (location) params.append("location", location);
      if (vehicleType) params.append("vehicleType", vehicleType);

      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-2 w-full max-w-4xl mx-auto ${className}`}
    >
      <div className="relative flex-grow">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="pl-10 h-12 bg-white border-gray-200 rounded-lg w-full">
            <SelectValue placeholder="Select your location" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full md:w-48">
        <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Select value={vehicleType} onValueChange={setVehicleType}>
          <SelectTrigger className="pl-10 h-12 bg-white border-gray-200 rounded-lg w-full">
            <SelectValue placeholder="Vehicle type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Henkilöautokurssi (B)">
              Henkilöautokurssi (B)
            </SelectItem>
            <SelectItem value="Motorcycle">Motorcycle</SelectItem>
            <SelectItem value="Truck">Truck</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleSearch}
        className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
        Find Courses
      </Button>
      <Button
        variant="outline"
        className="h-12 px-4 border-gray-200 text-gray-700 rounded-lg md:w-auto flex items-center gap-2"
        onClick={() => router.push("/search?showFilters=true")}
      >
        <Filter className="h-4 w-4" />
        Filters
      </Button>
    </div>
  );
}
