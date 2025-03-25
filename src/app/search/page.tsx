import { Suspense } from "react";
import { createClient } from "../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SearchBar from "@/components/search-bar";
import CourseCard from "@/components/course-card";
import PriceRangeFilter from "@/components/price-range-filter";
import LanguageFilter from "@/components/language-filter";
import HoursRangeFilter from "@/components/hours-range-filter";
import SortSelector from "@/components/sort-selector";
import FilterToggleButton from "@/components/filter-toggle-button";
import ClientMapWrapper from "@/components/client-map-wrapper";
import { MapPin, SlidersHorizontal, List, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Driving Courses - DrivingSchool.com",
  description:
    "Find and compare driving courses near you based on ratings, pricing, and course details.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const location = (searchParams.location as string) || "";
  const vehicleType = (searchParams.vehicleType as string) || "";
  const showFilters = searchParams.showFilters === "true";
  const viewMode = (searchParams.view as string) || "list";
  const sortBy = (searchParams.sort as string) || "price-asc";
  const minPrice = parseInt((searchParams.minPrice as string) || "0");
  const maxPrice = parseInt((searchParams.maxPrice as string) || "3000");
  const languages = Array.isArray(searchParams.languages)
    ? searchParams.languages
    : searchParams.languages
      ? [searchParams.languages as string]
      : [];
  const minTotalHours = parseInt((searchParams.minTotalHours as string) || "0");
  const maxTotalHours = parseInt(
    (searchParams.maxTotalHours as string) || "50",
  );
  const minDrivingHours = parseInt(
    (searchParams.minDrivingHours as string) || "0",
  );
  const maxDrivingHours = parseInt(
    (searchParams.maxDrivingHours as string) || "30",
  );
  const minSimulatorHours = parseInt(
    (searchParams.minSimulatorHours as string) || "0",
  );
  const maxSimulatorHours = parseInt(
    (searchParams.maxSimulatorHours as string) || "20",
  );

  const supabase = await createClient();

  // Determine which table to query based on vehicle type
  let query;

  if (vehicleType === "Henkilöautokurssi (B)") {
    // Query the courses_b table for Henkilöautokurssi (B)
    query = supabase.from("courses_b").select(`*`);
  } else {
    // Query the original courses table for other vehicle types
    query = supabase.from("courses").select(`
      *,
      driving_schools!inner(id, name, logo_url, average_rating, address, city, state),
      course_languages(language)
    `);
  }

  // Apply vehicle type filter if provided and not querying courses_b
  if (vehicleType && vehicleType !== "Henkilöautokurssi (B)") {
    query = query.eq("vehicle_type", vehicleType);
  }

  // Apply location filter if provided
  if (location) {
    if (vehicleType === "Henkilöautokurssi (B)") {
      query = query.ilike("kaupunki", `%${location}%`);
    } else {
      query = query.ilike("driving_schools.city", `%${location}%`);
    }
  }

  // Apply price filter
  if (vehicleType === "Henkilöautokurssi (B)") {
    query = query.gte("hinta", minPrice).lte("hinta", maxPrice);
  } else {
    query = query.gte("price", minPrice).lte("price", maxPrice);
  }

  // Apply hours filters
  if (vehicleType === "Henkilöautokurssi (B)") {
    query = query
      .gte("yhteensa_ajo_opetustunteja", minTotalHours)
      .lte("yhteensa_ajo_opetustunteja", maxTotalHours)
      .gte("ajotunnit_autokoulun_autolla", minDrivingHours)
      .lte("ajotunnit_autokoulun_autolla", maxDrivingHours)
      .gte("simulaattori_ajotunnit", minSimulatorHours)
      .lte("simulaattori_ajotunnit", maxSimulatorHours);
  } else {
    query = query
      .gte("total_hours", minTotalHours)
      .lte("total_hours", maxTotalHours)
      .gte("driving_hours", minDrivingHours)
      .lte("driving_hours", maxDrivingHours)
      .gte("simulator_hours", minSimulatorHours)
      .lte("simulator_hours", maxSimulatorHours);
  }

  // Apply sorting
  if (vehicleType === "Henkilöautokurssi (B)") {
    if (sortBy === "price-asc") {
      query = query.order("hinta", { ascending: true });
    } else if (sortBy === "price-desc") {
      query = query.order("hinta", { ascending: false });
    }
  } else {
    if (sortBy === "price-asc") {
      query = query.order("price", { ascending: true });
    } else if (sortBy === "price-desc") {
      query = query.order("price", { ascending: false });
    }
  }

  const { data: coursesData, error } = await query;

  if (error) {
    console.error("Error fetching courses:", error);
  }

  // Process the courses data based on vehicle type
  const courses =
    coursesData?.map((course) => {
      if (vehicleType === "Henkilöautokurssi (B)") {
        // Map courses_b data to match the expected format
        return {
          id: course.id,
          name: course.kurssi_nimi || "Henkilöautokurssi",
          description: `${course.opettaja_noutaa_ajotunnille ? "Opettaja noutaa ajotunnille. " : ""}${course.verkkoteoriatunnit_4_4 ? "Verkkoteoriatunnit 4+4. " : ""}${course.harjoitusajokoe || ""}`,
          price: course.hinta,
          total_hours: course.yhteensa_ajo_opetustunteja,
          driving_hours: course.ajotunnit_autokoulun_autolla,
          simulator_hours: course.simulaattori_ajotunnit,
          languages: course.koulutuskielet
            ? [course.koulutuskielet]
            : ["Finnish"],
          vehicle_type: vehicleType,
          school: {
            name: course.yritys || "Driving School",
            logo_url: "", // No logo in courses_b
            average_rating: 4.5, // Default rating
            address: course.osoite || "",
            city: course.kaupunki || "",
            state: "Finland",
          },
        };
      } else {
        // Original courses data processing
        const courseLanguages =
          course.course_languages?.map((cl) => cl.language) || [];
        return {
          ...course,
          languages: courseLanguages,
          school: course.driving_schools,
        };
      }
    }) || [];

  // Filter by languages if specified
  const filteredCourses =
    languages.length > 0
      ? courses.filter((course) => {
          return languages.every((lang) => course.languages.includes(lang));
        })
      : courses;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Find Driving{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
              Courses
            </span>{" "}
            Near You
          </h1>
          <SearchBar className="mb-4" />
          {location && (
            <div className="flex items-center justify-center text-blue-100 gap-2">
              <MapPin className="h-4 w-4" />
              <span>Showing results near: {location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`md:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-6">
                <SortSelector />
                <hr className="my-4" />
                <PriceRangeFilter
                  min={0}
                  max={3000}
                  value={[minPrice, maxPrice]}
                />
                <hr className="my-4" />
                <LanguageFilter selectedLanguages={languages} />
                <hr className="my-4" />
                <HoursRangeFilter
                  title="Total Driving Hours"
                  min={0}
                  max={50}
                  value={[minTotalHours, maxTotalHours]}
                />
                <hr className="my-4" />
                <HoursRangeFilter
                  title="Car Driving Hours"
                  min={0}
                  max={30}
                  value={[minDrivingHours, maxDrivingHours]}
                />
                <hr className="my-4" />
                <HoursRangeFilter
                  title="Simulator Hours"
                  min={0}
                  max={20}
                  value={[minSimulatorHours, maxSimulatorHours]}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {filteredCourses?.length || 0} Courses Found
                </h2>
                {location && (
                  <p className="text-sm text-gray-500">in or near {location}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center gap-1"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort
                </Button>

                <div className="flex border rounded-md overflow-hidden">
                  <a
                    href={`/search?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams).filter(([k]) => k !== "view")), view: "list" }).toString()}`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`rounded-none border-r ${viewMode === "map" ? "bg-gray-50" : "bg-white"}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </a>
                  <a
                    href={`/search?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams).filter(([k]) => k !== "view")), view: "map" }).toString()}`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`rounded-none ${viewMode === "map" ? "bg-white" : "bg-gray-50"}`}
                    >
                      <MapIcon className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Filters Button */}
            <div className="md:hidden mb-4">
              <FilterToggleButton showFilters={showFilters} />
            </div>

            {/* Results View (List or Map) */}
            {viewMode === "map" ? (
              <div className="h-[600px] mt-4">
                <Suspense
                  fallback={
                    <div className="h-full flex items-center justify-center">
                      Loading map...
                    </div>
                  }
                >
                  {filteredCourses && filteredCourses.length > 0 ? (
                    <ClientMapWrapper
                      schools={filteredCourses.map((course) => ({
                        id: course.id,
                        name: course.name,
                        address: course.school.address,
                        city: course.school.city,
                        state: course.school.state,
                        // In a real app, these would come from the database
                        lat: parseFloat(
                          (Math.random() * (42 - 33) + 33).toFixed(6),
                        ),
                        lng: parseFloat(
                          (Math.random() * (-70 - -120) + -120).toFixed(6),
                        ),
                      }))}
                      redirectPath="/course"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-center text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>No driving courses found matching your criteria.</p>
                      </div>
                    </div>
                  )}
                </Suspense>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Suspense fallback={<div>Loading courses...</div>}>
                  {filteredCourses && filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        name={course.name}
                        description={course.description || ""}
                        schoolName={course.school.name}
                        schoolLogoUrl={course.school.logo_url}
                        schoolRating={course.school.average_rating}
                        price={course.price}
                        address={course.school.address}
                        city={course.school.city}
                        state={course.school.state}
                        totalHours={course.total_hours}
                        drivingHours={course.driving_hours}
                        simulatorHours={course.simulator_hours}
                        languages={course.languages}
                        vehicleType={
                          course.vehicle_type as "Car" | "Motorcycle" | "Truck"
                        }
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center text-gray-500">
                      No driving courses found matching your criteria.
                    </div>
                  )}
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
