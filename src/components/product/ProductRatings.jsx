"use client";

import { Body1, Body2, BodyXS, Caption, Label } from "@/components/typography";

export default function ProductRatings({ rating = 4.5, reviews = [] }) {
  const ratingBreakdown = [
    { stars: 5, count: 45 },
    { stars: 4, count: 20 },
    { stars: 3, count: 5 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
  ];

  const defaultReviews = [
    {
      id: 1,
      author: "Alex Mathio",
      date: "13 Oct 2024",
      text: "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning the brand as a responsible choice in the fashion world.",
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  return (
    <section className="border-t border-neutral-200 pt-8">
      <div className="mb-6">
        <Label className="mb-4 text-[14px] uppercase tracking-[0.16em] text-[#20262B]">
          RATING & REVIEWS
        </Label>
        <div className="flex items-center gap-4">
          <Body1 className="text-[48px] font-semibold text-[#20262B]">
            {rating}
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
              Based on {displayReviews.length} reviews
            </Caption>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="mb-8 flex flex-col gap-2">
        {ratingBreakdown.map(({ stars, count }) => {
          const maxCount = Math.max(...ratingBreakdown.map((r) => r.count));
          const width = maxCount > 0 ? (count / maxCount) * 100 : 0;

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
        {displayReviews.map((review) => (
          <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-b-0">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BodyXS className="font-semibold text-[#20262B]">
                  {review.author}
                </BodyXS>
                <Caption className="text-[11px] text-[#6D6D6D]">
                  {review.date}
                </Caption>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${
                      star <= (review.rating || 5)
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
              "{review.text}"
            </Body2>
          </div>
        ))}
      </div>

      {/* View More Reviews */}
      <button
        type="button"
        className="mt-6 flex items-center gap-2 text-[14px] font-semibold text-[#202125] hover:underline"
      >
        <span>View all reviews</span>
        <span className="text-lg">→</span>
      </button>
    </section>
  );
}

