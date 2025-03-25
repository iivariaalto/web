import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";

export interface SchoolCardProps {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  rating: number;
  address: string;
  city: string;
  state: string;
  priceRange: string;
  distance?: number;
  courseTypes?: string[];
}

export default function SchoolCard({
  id,
  name,
  description,
  logoUrl,
  rating,
  address,
  city,
  state,
  priceRange,
  distance,
  courseTypes = ["Teen Drivers Ed", "Defensive Driving"],
}: SchoolCardProps) {
  // Convert price range to dollar signs
  const priceDisplay = priceRange.length > 0 ? priceRange : "$";

  return (
    <Link href={`/school/${id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100 h-full flex flex-col">
        <div className="flex items-start gap-4 mb-3">
          <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
            <Image
              src={
                logoUrl ||
                "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80"
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-amber-500 mt-1">
              <Star className="fill-current h-4 w-4" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              <span className="text-gray-400 text-sm ml-1">(120+ reviews)</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">
            {address}, {city}, {state}
          </span>
          {distance && (
            <span className="text-gray-400 ml-1">
              ({distance.toFixed(1)} mi)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <DollarSign className="h-3.5 w-3.5" />
          <span>{priceDisplay}</span>
        </div>

        <div className="mt-auto pt-2 flex flex-wrap gap-1">
          {courseTypes.map((course, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-blue-50 text-blue-700 border-blue-100"
            >
              {course}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
