"use client";

import { useState } from "react";
import { Body1, Body2, BodyXS, Caption, Label } from "@/components/typography";

export default function ProductRatings({ 
  rating = 0, 
  reviews = [], 
  totalReviews = 0,
  onAddReview,
  loading = false 
}) {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  // Calculate rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.round(r.rating) === stars).length,
  }));

  const maxCount = Math.max(...ratingBreakdown.map((r) => r.count), 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onAddReview) return;
    
    setSubmitting(true);
    try {
      await onAddReview(newReview);
      setNewReview({ rating: 5, comment: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="border-t border-neutral-200 pt-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Label className="mb-4 text-[14px] uppercase tracking-[0.16em] text-[#20262B]">
            RATING & REVIEWS
          </Label>
          <div className="flex items-center gap-4">
            <Body1 className="text-[48px] font-semibold text-[#20262B]">
              {rating.toFixed(1)}
            </Body1>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= Math.round(rating)
                        ? "text-yellow-400"
                        : "text-neutral-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <Caption className="text-[11px] text-[#6D6D6D]">
                Based on {totalReviews} reviews
              </Caption>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-6 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-12 p-6 bg-neutral-50 rounded-lg">
          <div className="mb-4">
            <Label className="block mb-2">Your Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`text-2xl ${
                    star <= newReview.rating ? "text-yellow-400" : "text-neutral-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <Label className="block mb-2">Your Comment</Label>
            <textarea
              required
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              rows="4"
              placeholder="Share your thoughts about this product..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white py-3 font-semibold uppercase tracking-wider disabled:bg-neutral-400"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Rating Breakdown */}
      <div className="mb-8 flex flex-col gap-2">
        {ratingBreakdown.map(({ stars, count }) => {
          const width = (count / maxCount) * 100;

          return (
            <div key={stars} className="flex items-center gap-3">
              <span className="w-8 text-right text-[12px] text-[#6D6D6D]">
                {stars}★
              </span>
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all"
                  style={{ width: `${width}%` }}
                />
              </div>
              <Caption className="text-[11px] text-[#6D6D6D] w-8">
                {count}
              </Caption>
            </div>
          );
        })}
      </div>

      {/* Reviews */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="py-10 text-center text-neutral-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="py-10 text-center text-neutral-500">No reviews yet. Be the first to review!</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id || review._id} className="border-b border-neutral-200 pb-6 last:border-b-0">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BodyXS className="font-semibold text-[#20262B]">
                    {review.userId?.displayName || review.displayName || review.user?.name || review.userName || "Anonymous"}
                  </BodyXS>
                  <Caption className="text-[11px] text-[#6D6D6D]">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recently"}
                  </Caption>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-neutral-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <Body2 className="text-[14px] text-[#6D6D6D] leading-relaxed">
                "{review.comment || review.text}"
              </Body2>
            </div>
          ))
        )}
      </div>

      {reviews.length > 5 && (
        <button
          type="button"
          className="mt-6 flex items-center gap-2 text-[14px] font-semibold text-[#202125] hover:underline"
        >
          <span>View all reviews</span>
          <span className="text-lg">→</span>
        </button>
      )}
    </section>
  );
}
