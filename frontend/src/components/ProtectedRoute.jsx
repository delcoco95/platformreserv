import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, userType = null }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Afficher le loading pendant la vérification
  if (loading) {
    return <LoadingSpinner />;
  }

  // Rediriger vers login si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier le type d'utilisateur si spécifié
  if (userType && user.userType !== userType) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
