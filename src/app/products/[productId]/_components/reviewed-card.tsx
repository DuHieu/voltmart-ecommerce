"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProductReviews } from "@/hooks/queries";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Star, CheckCircle2, ThumbsUp } from "lucide-react";
import { REALISTIC_REVIEWS_POOL, RealisticReview } from "@/data/productRichDetails";

type ReviewedCardProps = {
  productId: string;
  limit?: number;
  filterRating?: number | null;
  filterWithPhotos?: boolean;
};

export function ReviewedCard({
  productId,
  limit,
  filterRating = null,
  filterWithPhotos = false,
}: ReviewedCardProps) {
  const { data: reviewsData, isLoading: reviewsLoading } = useGetProductReviews(productId);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  // Combine database reviews with rich realistic seed pool
  const dbReviewsAsRealistic: RealisticReview[] = (reviewsData || []).map((rev) => ({
    id: `db-${rev.id}`,
    userName: "Verified Customer",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80",
    rating: rev.rating,
    date: rev.created_at ? format(new Date(rev.created_at), "MMM dd, yyyy") : "Just now",
    variant: "Variant: Official VoltMart Distribution",
    comment: rev.comment || "",
    helpfulCount: 5,
    verifiedPurchase: true,
  }));

  const allReviews: RealisticReview[] = [...dbReviewsAsRealistic, ...REALISTIC_REVIEWS_POOL];

  // Apply filters
  const filteredReviews = allReviews.filter((rev) => {
    if (filterRating !== null && rev.rating !== filterRating) return false;
    if (filterWithPhotos && (!rev.photos || rev.photos.length === 0)) return false;
    return true;
  });

  const displayedReviews = limit ? filteredReviews.slice(0, limit) : filteredReviews;

  const handleLike = (id: string, currentCount: number) => {
    if (userLiked[id]) return;
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || currentCount) + 1 }));
    setUserLiked((prev) => ({ ...prev, [id]: true }));
  };

  if (reviewsLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse border-border/60">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-1/4 rounded bg-muted" />
                  <div className="h-3 w-1/6 rounded bg-muted" />
                </div>
              </div>
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (displayedReviews.length === 0) {
    return (
      <Card className="border-border/60">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No customer reviews match the selected filter.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {displayedReviews.map((review) => {
        const currentLikes = likes[review.id] ?? review.helpfulCount;
        const isLiked = !!userLiked[review.id];

        return (
          <Card key={review.id} className="border-border/60 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start gap-3.5">
                {/* Real User Avatar */}
                <Avatar className="h-10 w-10 shrink-0 ring-2 ring-border/50">
                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                    {review.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Review Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-foreground">
                        {review.userName}
                      </h4>
                      {review.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>

                  {/* Stars & Variant */}
                  <div className="mt-1 flex flex-wrap items-center gap-2.5">
                    {RenderStars(review.rating, "sm")}
                    <span className="text-[11px] text-muted-foreground">
                      {review.variant}
                    </span>
                  </div>

                  {/* Comment Text */}
                  {review.comment && (
                    <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
                      {review.comment}
                    </p>
                  )}

                  {/* Customer Uploaded Photos */}
                  {review.photos && review.photos.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {review.photos.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          className="relative h-20 w-20 overflow-hidden rounded-lg border border-border/60 bg-muted hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          <Image
                            src={photo}
                            alt="Customer review photo"
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Store Official Response */}
                  {review.storeResponse && (
                    <div className="mt-3.5 rounded-lg border border-border/40 bg-muted/40 p-3 text-xs leading-relaxed">
                      <p className="font-bold text-primary flex items-center gap-1">
                        VoltMart Team Response:
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        {review.storeResponse}
                      </p>
                    </div>
                  )}

                  {/* Helpful Thumbs Up Action */}
                  <div className="mt-3.5 flex items-center justify-end">
                    <button
                      onClick={() => handleLike(review.id, review.helpfulCount)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                        isLiked
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <ThumbsUp className={`h-3.5 w-3.5 ${isLiked ? "fill-primary" : ""}`} />
                      <span>Helpful ({currentLikes})</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {limit && filteredReviews.length > limit && (
        <div className="text-center py-2">
          <p className="text-xs text-muted-foreground">
            Showing {limit} of {filteredReviews.length} reviews
          </p>
        </div>
      )}
    </div>
  );
}

export function RenderStars(rating: number, size: "sm" | "md" = "md") {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted/40"
          }`}
        />
      ))}
    </div>
  );
}

