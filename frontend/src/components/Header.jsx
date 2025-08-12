import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function Header() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-blue-600">
            RendezVousPro
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/professionals" className="text-gray-600 hover:text-gray-900">
              Professionnels
            </Link>
            {currentUser && (
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Tableau de bord
              </Link>
            )}
          </nav>

          {/* Authentification */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary text-sm"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="btn btn-secondary text-sm">
                  Connexion
                </Link>
                <Link to="/register" className="btn btn-primary text-sm">
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
