import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Search,
  User,
  Calendar,
  Menu,
  LogOut,
  Car,
  Wrench,
  Key,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { id: "automobile", label: "Auto", icon: Car },
    { id: "plomberie", label: "Plomberie", icon: Wrench },
    { id: "serrurerie", label: "Serrurier", icon: Key },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/professionnels?categorie=${categoryId}`);
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
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">
              RendezVousPro
            </span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un professionnel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </form>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {currentUser && userProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={currentUser.photoURL || ""} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {userProfile.userType === "client"
                          ? `${userProfile.firstName?.[0] || ""}${userProfile.lastName?.[0] || "C"}`
                          : userProfile.companyName?.[0] || "P"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userProfile.userType === "client"
                          ? `${userProfile.firstName || ""} ${userProfile.lastName || ""}`.trim() ||
                            "Client"
                          : userProfile.companyName || "Professionnel"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardPath()}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mon espace</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/connexion">
                    <User className="h-4 w-4 mr-2" />
                    Se connecter
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/inscription">S'inscrire</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Categories - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-center space-x-2 h-12 px-4 hover:bg-white hover:shadow-sm rounded-none border-b-2 border-transparent hover:border-primary transition-all"
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </Button>
              ))}
            </div>

            {/* Quick action */}
            <div className="hidden md:block py-2">
              <Link to="/professionnels">
                <Button variant="outline" size="sm" className="bg-white">
                  Voir tous les professionnels
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un professionnel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </form>

            {/* Mobile Categories */}
            <div className="grid grid-cols-3 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleCategoryClick(category.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex flex-col items-center space-y-1 h-16"
                >
                  <category.icon className="h-5 w-5" />
                  <span className="text-xs">{category.label}</span>
                </Button>
              ))}
            </div>

            {/* Mobile Auth */}
            {!currentUser ? (
              <div className="space-y-2 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/connexion" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Se connecter
                  </Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/inscription" onClick={() => setIsMenuOpen(false)}>
                    S'inscrire
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Mon espace
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
