import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: 'client' | 'professionnel';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/connexion" replace />;
  }

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
