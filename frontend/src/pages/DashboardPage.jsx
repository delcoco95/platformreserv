import { useAuth } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

function DashboardPage() {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="mt-2">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-600">
          Bienvenue {userProfile?.firstName || currentUser.email}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Statistiques de base */}
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-2">Profil</h3>
          <p className="text-gray-600">Type: {currentUser.userType}</p>
          <p className="text-gray-600">Email: {currentUser.email}</p>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-2">Rendez-vous</h3>
          <p className="text-gray-600">À venir: 0</p>
          <p className="text-gray-600">Passés: 0</p>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-2">Actions rapides</h3>
          <div className="space-y-2">
            {currentUser.userType === "client" ? (
              <button className="btn btn-primary w-full">
                Prendre RDV
              </button>
            ) : (
              <button className="btn btn-primary w-full">
                Gérer mes services
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section spécifique selon le type d'utilisateur */}
      {currentUser.userType === "professionnel" ? (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Gestion professionnelle</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-semibold mb-2">Mes services</h3>
              <p className="text-gray-600">Configurez vos services et tarifs</p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold mb-2">Disponibilités</h3>
              <p className="text-gray-600">Gérez votre agenda</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Mes rendez-vous</h2>
          <div className="card p-6">
            <p className="text-gray-600">Aucun rendez-vous pour le moment</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
