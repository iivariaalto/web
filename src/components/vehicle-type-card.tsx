import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";

interface VehicleTypeCardProps {
  type:
    | "Henkilöautokurssi (B)"
    | "Moottoripyöräkurssi (A)"
    | "Kuorma-autokurssi (C)"
    | "Kevarikurssi (A1)"
    | "Moottoripyöräkurssi (A2)"
    | "Mopokurssi (AM120)";
  imageUrl: string;
  description: string;
}

export default function VehicleTypeCard({
  type,
  imageUrl,
  description,
}: VehicleTypeCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search?vehicleType=${type.toLowerCase()}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 flex flex-col items-center text-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-32 w-32 mb-4">
        <Image
          src={imageUrl}
          alt={`${type} driving lessons`}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{type}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button className="mt-auto bg-blue-600 hover:bg-blue-700">
        Find Courses
      </Button>
    </div>
  );
}
