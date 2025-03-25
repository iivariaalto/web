import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, DollarSign, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

export interface CourseCardProps {
  id: string;
  name: string;
  description: string;
  schoolName: string;
  schoolLogoUrl: string;
  schoolRating: number;
  price: number;
  address: string;
  city: string;
  state: string;
  totalHours: number;
  drivingHours: number;
  simulatorHours: number;
  languages: string[];
  vehicleType: "Car" | "Motorcycle" | "Truck";
}

export default function CourseCard({
  id,
  name,
  description,
  schoolName,
  schoolLogoUrl,
  schoolRating,
  price,
  address,
  city,
  state,
  totalHours,
  drivingHours,
  simulatorHours,
  languages = ["English"],
  vehicleType,
}: CourseCardProps) {
  return (
    <Link href={`/course/${id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100 h-full flex flex-col">
        <div className="flex items-start gap-4 mb-3">
          <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
            <Image
              src={
                schoolLogoUrl ||
                "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80"
              }
              alt={schoolName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 line-clamp-1">
              {name}
            </h3>
            <div className="text-sm text-gray-600 mb-1">{schoolName}</div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="fill-current h-4 w-4" />
              <span className="text-sm font-medium">
                {schoolRating.toFixed(1)}
              </span>
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
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <DollarSign className="h-3.5 w-3.5" />
          <span className="font-medium text-blue-600">€{price}</span>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {totalHours} total hours ({drivingHours} driving, {simulatorHours}{" "}
            simulator)
          </span>
        </div>

        <div className="mt-auto pt-2 flex flex-wrap gap-1">
          <Badge
            variant="outline"
            className="text-xs bg-blue-50 text-blue-700 border-blue-100"
          >
            {vehicleType}
          </Badge>
          {languages.map((language, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-purple-50 text-purple-700 border-purple-100"
            >
              {language}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
