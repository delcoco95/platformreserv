import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: 'client' | 'professionnel';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();

  // Afficher un loading pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Rediriger vers login si non authentifié
  if (!currentUser) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  // Vérifier le type d'utilisateur si sp��cifié
  if (requiredUserType && userProfile?.userType !== requiredUserType) {
    // Rediriger vers le bon dashboard selon le type d'utilisateur
    const redirectPath = userProfile?.userType === 'client' 
      ? '/espace-client' 
      : '/espace-professionnel';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
