import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, Car, Wrench, Key, Users } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  resultsCount: number;
}

const categories = [
  { value: "all", label: "Toutes les catégories", icon: Users },
  { value: "automobile", label: "Automobile", icon: Car },
  { value: "plomberie", label: "Plomberie", icon: Wrench },
  { value: "serrurerie", label: "Serrurerie", icon: Key },
];

export const SearchFilters = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  resultsCount,
}: SearchFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher par nom, service, ville..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="md:w-64">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center space-x-2">
                    <category.icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          {resultsCount} professionnel{resultsCount > 1 ? "s" : ""} trouvé
          {resultsCount > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};
