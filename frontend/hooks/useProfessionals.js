import { useState, useEffect } from "react";
import { professionalService } from "../services/professionalService.js";

export const useProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = professionalService.onProfessionalsChange((data) => {
      console.log("Données professionnels reçues:", data);
      
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
