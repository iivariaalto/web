import { createClient } from "../../supabase/server";
import { Star } from "lucide-react";
import ReviewForm from "./review-form";

interface ReviewsSectionProps {
  schoolId: string;
}

export default async function ReviewsSection({
  schoolId,
}: ReviewsSectionProps) {
  const supabase = await createClient();

  // Fetch reviews for this school
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("school_id", schoolId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return <div>Failed to load reviews</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">Student Reviews</h2>

        {reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? "fill-current" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">
                        {review.reviewer_name}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No reviews yet. Be the first to review this driving school!
          </p>
        )}
      </div>

      <ReviewForm schoolId={schoolId} />
    </div>
  );
}
