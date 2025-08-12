import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Afficher le loading pendant la vérification
  if (loading) {
    return <LoadingSpinner />;
  }

  // Rediriger vers dashboard si déjà authentifié
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
