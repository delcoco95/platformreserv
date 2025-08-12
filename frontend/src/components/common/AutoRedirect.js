import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const AutoRedirect = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirection automatique après connexion
    if (currentUser && userProfile) {
      const isAuthPage = ["/connexion", "/inscription"].includes(location.pathname);
      
      if (isAuthPage) {
        const dashboardPath = userProfile.userType === "client" 
          ? "/espace-client" 
          : "/espace-professionnel";
        navigate(dashboardPath, { replace: true });
      }
    }
  }, [currentUser, userProfile, navigate, location.pathname]);

  return null;
};
