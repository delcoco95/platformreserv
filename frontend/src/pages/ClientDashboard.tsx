import { useAuth } from "../contexts/AuthContext";

export default function ClientDashboard() {
  const { userProfile } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Espace Client</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Bienvenue dans votre espace client</h2>
        {userProfile && (
          <p className="text-gray-600">
            Bonjour {userProfile.firstName} {userProfile.lastName}
          </p>
        )}
        <p className="text-gray-600 mt-4">Cette page est en cours de développement.</p>
      </div>
    </div>
  );
}
