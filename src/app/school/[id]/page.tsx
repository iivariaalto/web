import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "../../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ReviewsSection from "@/components/reviews-section";
import ClientMapWrapper from "@/components/client-map-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  Mail,
  Clock,
  DollarSign,
  Calendar,
  Award,
} from "lucide-react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: school } = await supabase
    .from("driving_schools")
    .select("name, city, state")
    .eq("id", params.id)
    .single();

  return {
    title: school
      ? `${school.name} - Driving School in ${school.city}, ${school.state}`
      : "School Details",
    description: school
      ? `Learn more about ${school.name} driving school in ${school.city}, ${school.state}. View courses, pricing, and contact information.`
      : "",
  };
}

export default async function SchoolDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Fetch school details
  const { data: school, error } = await supabase
    .from("driving_schools")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !school) {
    console.error("Error fetching school:", error);
    notFound();
  }

  // Fetch courses offered by this school
  const { data: courses } = await supabase
    .from("school_courses")
    .select(
      `
      id,
      price,
      duration,
      course_types(name)
    `,
    )
    .eq("school_id", school.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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

            {/* School Info */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {school.name}
              </h1>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="fill-current h-5 w-5" />
                  <span className="font-medium">
                    {school.average_rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-400">(120+ reviews)</span>
                <Badge
                  variant="outline"
                  className="ml-2 bg-blue-50 text-blue-700 border-blue-100"
                >
                  Top Rated
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>
                    {school.address}, {school.city}, {school.state}{" "}
                    {school.zip_code}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>{school.price_range}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Contact School
                </Button>
                <Button variant="outline">Save for Later</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">
                About {school.name}
              </h2>
              <p className="text-gray-600 mb-4">{school.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Certified Instructors</h3>
                    <p className="text-sm text-gray-500">
                      Professional training
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Flexible Scheduling</h3>
                    <p className="text-sm text-gray-500">
                      Book at your convenience
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quick Completion</h3>
                    <p className="text-sm text-gray-500">Get licensed faster</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Competitive Pricing</h3>
                    <p className="text-sm text-gray-500">
                      Great value for money
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Available Courses</h2>

              <div className="space-y-4">
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">
                            {course.course_types?.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            Duration: {course.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-semibold text-gray-900">
                            ${course.price}
                          </div>
                          <Button
                            size="sm"
                            className="mt-2 bg-blue-600 hover:bg-blue-700"
                          >
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No courses available at the moment.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Phone</h3>
                    <p>{school.phone || "Not available"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">Email</h3>
                    <p>{school.email || "Not available"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm text-gray-500">
                      Website
                    </h3>
                    <a
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {school.website
                        ? new URL(school.website).hostname
                        : "Not available"}
                    </a>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6">Contact School</Button>
            </div>

            {/* Map Preview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Location</h2>

              <div className="aspect-video rounded-lg overflow-hidden relative">
                <ClientMapWrapper
                  schools={[
                    {
                      id: school.id,
                      name: school.name,
                      address: school.address,
                      city: school.city,
                      state: school.state,
                      // In a real app, these would come from the database
                      lat: parseFloat(
                        (Math.random() * (42 - 33) + 33).toFixed(6),
                      ),
                      lng: parseFloat(
                        (Math.random() * (-70 - -120) + -120).toFixed(6),
                      ),
                    },
                  ]}
                  redirectPath="/school"
                />
              </div>

              <Button variant="outline" className="w-full mt-4">
                Get Directions
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6">Reviews & Ratings</h2>
          <ReviewsSection schoolId={school.id} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
