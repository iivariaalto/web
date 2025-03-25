"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { createClient } from "@supabase/supabase-js";

interface ReviewFormProps {
  schoolId: string;
  onSuccess?: () => void;
}

export default function ReviewForm({ schoolId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (rating === 0) {
      setError("Please select a rating");
      setIsSubmitting(false);
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a review comment");
      setIsSubmitting(false);
      return;
    }

    try {
      // Get user if logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Submit review
      const { error: submitError } = await supabase.from("reviews").insert([
        {
          school_id: schoolId,
          user_id: user?.id || null,
          rating,
          comment,
          reviewer_name: name || "Anonymous",
          reviewer_email: email || null,
        },
      ]);

      if (submitError) throw submitError;

      // Update school average rating
      const { data: reviews } = await supabase
        .from("reviews")
        .select("rating")
        .eq("school_id", schoolId);

      if (reviews) {
        const avgRating =
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length;

        await supabase
          .from("driving_schools")
          .update({ average_rating: avgRating })
          .eq("id", schoolId);
      }

      setSuccess(true);
      setRating(0);
      setComment("");
      setName("");
      setEmail("");

      if (onSuccess) onSuccess();

      // Refresh the page data
      router.refresh();
    } catch (err: any) {
      console.error("Error submitting review:", err);
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

      {success ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
          Thank you for your review! Your feedback helps others make informed
          decisions.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${(hoverRating || rating) >= star ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Review
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this driving school..."
              rows={4}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Email (not published)
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}
    </div>
  );
}
