import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RendezVousPro
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Plateforme de prise de rendez-vous avec des professionnels
        </p>

        {currentUser ? (
          <div className="space-y-4">
            <p className="text-lg">Bonjour {currentUser.email} !</p>
            <Link 
              to="/dashboard" 
              className="btn btn-primary inline-block"
            >
              Accéder au tableau de bord
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="btn btn-primary"
            >
              Se connecter
            </Link>
            <Link 
              to="/register" 
              className="btn btn-secondary"
            >
              S'inscrire
            </Link>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6">
              <h3 className="font-semibold mb-2">1. Inscrivez-vous</h3>
              <p className="text-gray-600">Créez votre compte client ou professionnel</p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold mb-2">2. Trouvez un pro</h3>
              <p className="text-gray-600">Recherchez des professionnels dans votre secteur</p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold mb-2">3. Prenez RDV</h3>
              <p className="text-gray-600">Réservez votre créneau en quelques clics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
