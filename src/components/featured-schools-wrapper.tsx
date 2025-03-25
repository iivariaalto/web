import { createClient } from "../../supabase/server";
import FeaturedSchoolsCarousel from "./featured-schools-carousel";

export default async function FeaturedSchoolsWrapper() {
  const supabase = await createClient();

  // Fetch top-rated driving schools
  const { data: schools, error } = await supabase
    .from("driving_schools")
    .select("*")
    .order("average_rating", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching schools:", error);
    return <div>Failed to load featured schools</div>;
  }

  const schoolsWithProps = schools?.map((school) => ({
    id: school.id,
    name: school.name,
    description: school.description,
    logoUrl: school.logo_url,
    rating: school.average_rating,
    address: school.address,
    city: school.city,
    state: school.state,
    priceRange: school.price_range,
    courseTypes: ["Teen Drivers Ed", "Defensive Driving"],
  }));

  return <FeaturedSchoolsCarousel schools={schoolsWithProps || []} />;
}
