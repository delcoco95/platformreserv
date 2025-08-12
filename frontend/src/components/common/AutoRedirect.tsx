import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function AutoRedirect() {
  const { currentUser, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ne rien faire pendant le chargement
    if (loading) return;

    // Si l'utilisateur est connecté et sur la page de connexion/inscription
    if (currentUser && (location.pathname === '/connexion' || location.pathname === '/inscription')) {
      // Rediriger vers le dashboard approprié
      const dashboardPath = userProfile?.userType === 'client' 
        ? '/espace-client' 
        : '/espace-professionnel';
      navigate(dashboardPath, { replace: true });
    }
  }, [currentUser, userProfile, loading, location.pathname, navigate]);

  return null;
}
