import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProfessionalProfile } from "../types";

// Fonction pour normaliser le texte (insensible aux accents)
const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const useProfessionalFilters = (professionals: ProfessionalProfile[]) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categorie") || "all"
  );
  const [filteredProfessionals, setFilteredProfessionals] = useState<ProfessionalProfile[]>([]);

  useEffect(() => {
    let filtered = [...professionals];

    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter((prof) => prof.profession === selectedCategory);
    }

    // Filtrer par recherche
    if (searchQuery.trim()) {
      const query = normalizeText(searchQuery);
      filtered = filtered.filter((prof) =>
        normalizeText(prof.companyName || "").includes(query) ||
        normalizeText(prof.profession || "").includes(query) ||
        (prof.services &&
          Array.isArray(prof.services) &&
          prof.services.some((service) =>
            normalizeText(
              typeof service === "string" ? service : service?.name || ""
            ).includes(query)
          )) ||
        normalizeText(prof.address || "").includes(query) ||
        normalizeText(prof.description || "").includes(query)
      );
    }

    setFilteredProfessionals(filtered);
  }, [professionals, searchQuery, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const hasFilters = searchQuery.trim() !== "" || selectedCategory !== "all";

  return {
    searchQuery,
    selectedCategory,
    filteredProfessionals,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
    hasFilters,
  };
};
