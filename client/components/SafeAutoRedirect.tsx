import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Hook safe pour useAuth
const useSafeAuth = () => {
  try {
    const { useAuth } = require("../contexts/AuthContext");
    return useAuth();
  } catch (error) {
    return {
      currentUser: null,
      userProfile: null,
      loading: false,
    };
  }
};

export function SafeAutoRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile, loading } = useSafeAuth();

  useEffect(() => {
    // Ne rien faire pendant le chargement
    if (loading) return;

    // Si utilisateur connecté et on a son profil
    if (currentUser && userProfile) {
      const currentPath = location.pathname;

      // Déterminer le dashboard approprié
      const targetDashboard =
        userProfile.userType === "client"
          ? "/espace-client"
          : "/espace-professionnel";

      // Rediriger depuis les pages d'auth ou la page d'accueil après connexion
      if (
        currentPath === "/connexion" ||
        currentPath === "/inscription" ||
        (currentPath === "/" && location.search.includes("redirect=dashboard"))
      ) {
        navigate(targetDashboard, { replace: true });
      }
    }
  }, [currentUser, userProfile, loading, navigate, location]);

  return null; // Ce composant ne rend rien
}
