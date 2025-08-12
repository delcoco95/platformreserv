import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, Calendar, Menu, LogOut, Car, Wrench, Key } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    {
      id: "automobile",
      label: "Auto",
      icon: Car,
      path: "/professionnels?categorie=automobile",
    },
    {
      id: "plomberie",
      label: "Plomberie", 
      icon: Wrench,
      path: "/professionnels?categorie=plomberie",
    },
    {
      id: "serrurerie",
      label: "Serrurier",
      icon: Key,
      path: "/professionnels?categorie=serrurerie",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/professionnels?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const getDashboardPath = () => {
    return userProfile?.userType === "client"
      ? "/espace-client"
      : "/espace-professionnel";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-white/95">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">
              BookAuto
            </span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un professionnel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </form>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={getDashboardPath()}
                  className="hidden md:flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <User className="h-4 w-4" />
                  <span>Mon espace</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/connexion"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  S'inscrire
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="hidden md:block bg-gray-50 border-b">
        <div className="container">
          <nav className="flex space-x-8 py-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={category.path}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container py-4 space-y-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </form>

            {/* Mobile categories */}
            <div className="space-y-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    to={category.path}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{category.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile user menu */}
            {currentUser && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">Mon espace</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
