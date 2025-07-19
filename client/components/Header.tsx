import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, User, Calendar, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">RendezVousPro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/recherche"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Trouver un professionnel
          </Link>
          <Link
            to="/comment-ca-marche"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Comment ça marche
          </Link>
          <Link
            to="/professionnels"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Espace pro
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container py-4 space-y-2">
            <Link
              to="/recherche"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Trouver un professionnel
            </Link>
            <Link
              to="/comment-ca-marche"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link
              to="/professionnels"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Espace pro
            </Link>
            <div className="pt-2 space-y-2">
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
          </div>
        </div>
      )}
    </header>
  );
}
