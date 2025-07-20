import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AutoRedirect() {
  const { currentUser, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ne rien faire pendant le chargement
    if (loading) return;

    // Si utilisateur connecté et on a son profil
    if (currentUser && userProfile) {
      const currentPath = location.pathname;
      
      // Déterminer le dashboard approprié
      const targetDashboard = userProfile.userType === 'client' 
        ? '/espace-client' 
        : '/espace-professionnel';

      // Rediriger depuis les pages d'auth ou la page d'accueil après connexion
      if (currentPath === '/connexion' || 
          currentPath === '/inscription' ||
          (currentPath === '/' && location.search.includes('redirect=dashboard'))) {
        navigate(targetDashboard, { replace: true });
      }
    }
  }, [currentUser, userProfile, loading, navigate, location]);

  return null; // Ce composant ne rend rien
}
