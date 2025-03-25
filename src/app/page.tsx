import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/search-bar";
import FeaturedSchoolsWrapper from "@/components/featured-schools-wrapper";
import VehicleTypeSection from "@/components/vehicle-type-section";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  MapPin,
  Filter,
  Star,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section with Search */}
      <div className="relative overflow-hidden bg-white">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />

        <div className="relative pt-24 pb-20 sm:pt-32 sm:pb-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Find the
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                  id="perfect-gradient-text"
                >
                  {" "}
                  Perfect{" "}
                </span>
                Driving School Near You
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Compare top-rated driving schools based on reviews, pricing, and
                available courses to find your perfect match.
              </p>

              <SearchBar className="mb-8" />

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>500+ Verified Schools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span>Real Student Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-500" />
                  <span>Compare Pricing & Courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Type Selection Section */}
      <VehicleTypeSection />

      {/* Featured Schools Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Featured Driving Schools
              </h2>
              <p className="text-gray-600">
                Discover our recommended schools in your area
              </p>
            </div>
            <Link
              href="/search"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <FeaturedSchoolsWrapper />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding the right driving school has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Search Your Location",
                description:
                  "Enter your city or zip code to find driving schools near you",
                icon: <MapPin className="w-6 h-6" />,
              },
              {
                number: "02",
                title: "Compare Schools",
                description:
                  "Filter by price, course types, and read authentic reviews",
                icon: <Filter className="w-6 h-6" />,
              },
              {
                number: "03",
                title: "Contact & Enroll",
                description:
                  "Reach out directly to your chosen school and get started",
                icon: <Users className="w-6 h-6" />,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm relative"
              >
                <div className="text-xs font-bold text-blue-600 mb-4">
                  {step.number}
                </div>
                <div className="text-blue-600 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing how you find and compare driving schools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="w-6 h-6" />,
                title: "Verified Reviews",
                description: "Authentic feedback from real students",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Vetted Schools",
                description: "All schools are licensed and certified",
              },
              {
                icon: <Filter className="w-6 h-6" />,
                title: "Easy Comparison",
                description: "Compare prices and courses side by side",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Free to Use",
                description: "No fees or hidden charges",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Driving School?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who found their perfect driving school
            through our platform.
          </p>
          <Link href="/search">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Search Schools Now
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
