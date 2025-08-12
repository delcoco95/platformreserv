import { useState, useEffect } from "react";
import { professionalService } from "../services/professionalService";
import { ProfessionalProfile } from "../types";

export const useProfessionals = () => {
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = professionalService.onProfessionalsChange((data) => {
      console.log("Données professionnels reçues:", data);
      
      // Vérification de sécurité pour éviter les erreurs
      const validProfessionals = data.filter((prof) => {
        if (prof.services && !Array.isArray(prof.services)) {
          console.warn("Services invalides pour le professionnel:", prof.uid);
          return false;
        }
        return true;
      });
      
      setProfessionals(validProfessionals);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  return { professionals, loading, error };
};
