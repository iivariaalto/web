import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function SchoolDetailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-lg" />

            {/* School Info */}
            <div className="flex-grow">
              <Skeleton className="h-10 w-3/4 mb-4" />

              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-24" />
              </div>

              <div className="flex gap-2 mt-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
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
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Skeleton className="h-8 w-48 mb-6" />

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-7 w-20 mb-2" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Skeleton className="h-6 w-48 mb-6" />

              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5 mt-1" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                ))}
              </div>

              <Skeleton className="h-10 w-full mt-6" />
            </div>

            {/* Map Preview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="aspect-video w-full rounded-lg mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
