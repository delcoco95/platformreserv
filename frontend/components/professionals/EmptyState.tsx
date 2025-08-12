import { Button } from "../ui/button";
import { Users } from "lucide-react";

interface EmptyStateProps {
  hasFilters: boolean;
  onResetFilters: () => void;
}

export const EmptyState = ({ hasFilters, onResetFilters }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Users className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Aucun professionnel trouvé
      </h3>
      <p className="text-gray-600 mb-6">
        {hasFilters
          ? "Essayez de modifier vos critères de recherche"
          : "Aucun professionnel n'est inscrit pour le moment"}
      </p>
      {hasFilters && (
        <Button variant="outline" onClick={onResetFilters}>
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );
};
