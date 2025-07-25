import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { professionalService } from "../services/professionalService";
import { ProfessionalProfile } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { DemoModeAlert } from "../components/DemoModeAlert";
import { NewProfessionalAlert } from "../components/NewProfessionalAlert";
import {
  SearchFilters,
  ProfessionalCard,
  EmptyState,
} from "../components/professionals";

export default function ProfessionalsList() {
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<
    ProfessionalProfile[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categorie") || "all",
  );

  useEffect(() => {
    // Utiliser un listener temps réel pour les professionnels
    const unsubscribe = professionalService.onProfessionalsChange((data) => {
      console.log("Données professionnels reçues:", data);

      // Vérification de sécurité pour éviter les erreurs
      const validProfessionals = data.filter((prof) => {
        // Vérifier que les services sont valides
        if (prof.services && !Array.isArray(prof.services)) {
          console.warn("Services invalides pour le professionnel:", prof.uid);
          return false;
        }
        return true;
      });

      setProfessionals(validProfessionals);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    filterProfessionals();
  }, [professionals, searchQuery, selectedCategory]);

  // Fonction pour normaliser le texte (insensible aux accents)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const filterProfessionals = () => {
    let filtered = [...professionals];

    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (prof) => prof.profession === selectedCategory,
      );
    }

    // Filtrer par recherche (insensible aux accents et à la casse)
    if (searchQuery.trim()) {
      const query = normalizeText(searchQuery);
      filtered = filtered.filter(
        (prof) =>
          normalizeText(prof.companyName || "").includes(query) ||
          normalizeText(prof.profession || "").includes(query) ||
          (prof.services &&
            Array.isArray(prof.services) &&
            prof.services.some((service) =>
              normalizeText(
                typeof service === "string" ? service : service?.name || "",
              ).includes(query),
            )) ||
          normalizeText(prof.address || "").includes(query) ||
          normalizeText(prof.description || "").includes(query),
      );
    }

    setFilteredProfessionals(filtered);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const hasFilters = searchQuery.trim() !== "" || selectedCategory !== "all";

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">
            Chargement des professionnels...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <NewProfessionalAlert professionals={professionals} />
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nos professionnels
          </h1>
          <p className="text-muted-foreground">
            Découvrez tous les professionnels disponibles sur notre plateforme
          </p>
        </div>

        {/* Demo Mode Alert */}
        {!currentUser && <DemoModeAlert />}

        {/* Search Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          resultsCount={filteredProfessionals.length}
        />

        {/* Results */}
        {filteredProfessionals.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onResetFilters={handleResetFilters}
          />
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
