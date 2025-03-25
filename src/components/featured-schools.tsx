import { createClient } from "../../supabase/server";
import SchoolCard from "./school-card";

export default async function FeaturedSchools() {
  const supabase = await createClient();

  // Fetch top-rated driving schools
  const { data: schools, error } = await supabase
    .from("driving_schools")
    .select("*")
    .order("average_rating", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching schools:", error);
    return <div>Failed to load featured schools</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {schools?.map((school) => (
        <SchoolCard
          key={school.id}
          id={school.id}
          name={school.name}
          description={school.description}
          logoUrl={school.logo_url}
          rating={school.average_rating}
          address={school.address}
          city={school.city}
          state={school.state}
          priceRange={school.price_range}
        />
      ))}

      {/* Fallback if no schools are found */}
      {(!schools || schools.length === 0) && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No featured schools available at the moment.
        </div>
      )}
    </div>
  );
}
