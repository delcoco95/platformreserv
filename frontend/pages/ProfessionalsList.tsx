import { useAuth } from "../contexts/AuthContext";
import { DemoModeAlert } from "../components/DemoModeAlert";
import { NewProfessionalAlert } from "../components/NewProfessionalAlert";
import {
  SearchFilters,
  ProfessionalCard,
  EmptyState,
} from "../components/professionals";
import { LoadingSpinner, PageHeader } from "../components/common";
import { useProfessionals } from "../hooks/useProfessionals";
import { useProfessionalFilters } from "../hooks/useProfessionalFilters";

export default function ProfessionalsList() {
  const { currentUser } = useAuth();
  const { professionals, loading } = useProfessionals();
  const {
    searchQuery,
    selectedCategory,
    filteredProfessionals,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
    hasFilters,
  } = useProfessionalFilters(professionals);

  if (loading) {
    return <LoadingSpinner message="Chargement des professionnels..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <NewProfessionalAlert professionals={professionals} />
      
      <div className="container max-w-7xl mx-auto px-4">
        <PageHeader
          title="Nos professionnels"
          description="Découvrez tous les professionnels disponibles sur notre plateforme"
        />

        {!currentUser && <DemoModeAlert />}

        <SearchFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          resultsCount={filteredProfessionals.length}
        />

        {filteredProfessionals.length === 0 ? (
          <EmptyState hasFilters={hasFilters} onResetFilters={resetFilters} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.uid}
                professional={professional}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
