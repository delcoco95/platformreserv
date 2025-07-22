import React from "react";
import { useAuth } from "../contexts/AuthContext";

interface AuthWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ 
  children, 
  fallback = null 
}) => {
  try {
    const { loading } = useAuth();
    
    // Pendant le chargement, on affiche le fallback
    if (loading) {
      return <>{fallback}</>;
    }
    
    return <>{children}</>;
  } catch (error) {
    console.error("Erreur du contexte d'authentification:", error);
    // Si le contexte n'est pas disponible, on affiche quand même le contenu
    return <>{children}</>;
  }
};
