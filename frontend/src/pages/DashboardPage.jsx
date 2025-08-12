import { useAuth } from '@contexts/AuthContext';
import ClientDashboard from '@components/dashboard/ClientDashboard';
import ProfessionalDashboard from '@components/dashboard/ProfessionalDashboard';
import LoadingSpinner from '@components/LoadingSpinner';

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner text="Chargement du tableau de bord..." />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Erreur de chargement du profil utilisateur</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.userType === 'client' ? (
        <ClientDashboard />
      ) : (
        <ProfessionalDashboard />
      )}
    </div>
  );
};

export default DashboardPage;
