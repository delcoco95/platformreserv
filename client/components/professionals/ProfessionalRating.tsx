import { Star } from "lucide-react";

interface ProfessionalRatingProps {
  rating?: number;
  totalReviews?: number;
}

export const ProfessionalRating = ({ rating, totalReviews }: ProfessionalRatingProps) => {
  if (rating && rating > 0) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {totalReviews && totalReviews > 0
            ? `(${totalReviews} avis)`
            : "(Nouveau)"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-muted-foreground">
      <Star className="h-4 w-4" />
      <span className="text-sm ml-1">Pas encore de note</span>
    </div>
  );
};
