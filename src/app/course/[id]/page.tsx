import { createClient } from "../../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import {
  Star,
  MapPin,
  DollarSign,
  Clock,
  Globe,
  Car,
  Truck,
  Motorcycle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select(
      `
      *,
      driving_schools!inner(name)
    `,
    )
    .eq("id", params.id)
    .single();

  return {
    title: course
      ? `${course.name} - ${course.driving_schools.name}`
      : "Course Details",
    description:
      course?.description ||
      "View detailed information about this driving course",
  };
}

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      driving_schools!inner(id, name, logo_url, average_rating, address, city, state, phone, email, website),
      course_languages(language)
    `,
    )
    .eq("id", params.id)
    .single();

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <p className="text-gray-600 mb-8">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/search">Browse Courses</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const languages = course.course_languages?.map((cl) => cl.language) || [];
  const school = course.driving_schools;

  const VehicleIcon =
    {
      Car: Car,
      Motorcycle: Motorcycle,
      Truck: Truck,
    }[course.vehicle_type] || Car;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                src={
                  school.logo_url ||
                  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80"
                }
                alt={school.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {course.name}
              </h1>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-medium">{school.name}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="fill-current h-4 w-4" />
                  <span className="text-sm font-medium">
                    {school.average_rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {school.address}, {school.city}, {school.state}
                </span>
              </div>
            </div>

            <div className="md:text-right">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                €{course.price}
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Course Description</h2>
              <p className="text-gray-700 mb-6">{course.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-blue-600 mb-2">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">Total Hours</div>
                  <div className="text-2xl font-bold">{course.total_hours}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-blue-600 mb-2">
                    <VehicleIcon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">Driving Hours</div>
                  <div className="text-2xl font-bold">
                    {course.driving_hours}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-blue-600 mb-2">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">Simulator Hours</div>
                  <div className="text-2xl font-bold">
                    {course.simulator_hours}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>
                    Essential driving skills and techniques for{" "}
                    {course.vehicle_type.toLowerCase()} operation
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>
                    Traffic rules and regulations according to Finnish law
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>Defensive driving strategies to prevent accidents</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>Vehicle maintenance basics and safety checks</div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">✓</div>
                  <div>Practical experience in various driving conditions</div>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Course Details</h2>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Vehicle Type</div>
                  <div className="flex items-center gap-1">
                    <VehicleIcon className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{course.vehicle_type}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Languages</div>
                  <div className="flex flex-wrap gap-1">
                    {languages.map((language, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-100"
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Price</div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">€{course.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Contact School</h2>

              <div className="space-y-4">
                {school.phone && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone</div>
                    <div className="font-medium">{school.phone}</div>
                  </div>
                )}

                {school.email && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <div className="font-medium">{school.email}</div>
                  </div>
                )}

                {school.website && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Website</div>
                    <a
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {school.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}

                <Button className="w-full mt-2">Contact School</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
