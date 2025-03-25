import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SearchBar from "@/components/search-bar";
import { MapPin } from "lucide-react";

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Find Driving Schools Near You
          </h1>
          <SearchBar className="mb-4" />
          <div className="flex items-center justify-center text-blue-100 gap-2">
            <MapPin className="h-4 w-4" />
            <span>Loading results...</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-64 flex-shrink-0 hidden md:block">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>

              <div className="space-y-6">
                <div>
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                </div>

                <Skeleton className="h-px w-full" />

                <div>
                  <Skeleton className="h-5 w-24 mb-4" />
                  <Skeleton className="h-8 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-8 w-40" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-24 hidden md:block" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-grow">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
