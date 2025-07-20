import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Car, 
  Wrench, 
  Key, 
  Clock,
  Shield,
  Award,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { 
      id: 'automobile', 
      label: 'Automobile', 
      icon: Car, 
      description: 'Entretien et réparation',
      link: '/professionnels?categorie=automobile'
    },
    { 
      id: 'plomberie', 
      label: 'Plomberie', 
      icon: Wrench, 
      description: 'Installation et dépannage',
      link: '/professionnels?categorie=plomberie'
    },
    { 
      id: 'serrurerie', 
      label: 'Serrurerie', 
      icon: Key, 
      description: 'Sécurité et urgences',
      link: '/professionnels?categorie=serrurerie'
    },
  ];

  const quickLinks = [
    { label: "Comment ça marche", href: "/comment-ca-marche" },
    { label: "Devenir professionnel", href: "/inscription" },
    { label: "Nos garanties", href: "/garanties" },
    { label: "Zone de couverture", href: "/zones" },
    { label: "Aide et support", href: "/aide" },
    { label: "FAQ", href: "/faq" },
  ];

  const legalLinks = [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Conditions d'utilisation", href: "/conditions" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "Gestion des cookies", href: "/cookies" },
  ];

  const features = [
    { icon: Clock, text: "Réservation 24h/24" },
    { icon: Shield, text: "Professionnels vérifiés" },
    { icon: Award, text: "Satisfaction garantie" },
    { icon: Heart, text: "Service client dédié" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">RendezVousPro</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              La plateforme de référence pour réserver vos services à domicile. 
              Automobile, plomberie, serrurerie : trouvez le professionnel qu'il vous faut 
              en quelques clics.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Service disponible dans toute la France</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors">
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contact@rendezvoupro.fr" className="hover:text-white transition-colors">
                  contact@rendezvoupro.fr
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Nos services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.link}
                    className="flex items-start space-x-3 text-sm hover:text-white transition-colors group"
                  >
                    <service.icon className="h-5 w-5 mt-0.5 text-primary group-hover:text-white transition-colors" />
                    <div>
                      <div className="font-medium">{service.label}</div>
                      <div className="text-xs text-gray-400">{service.description}</div>
                    </div>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/professionnels"
                  className="text-sm text-primary hover:text-white transition-colors font-medium"
                >
                  → Voir tous les professionnels
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-white font-semibold mb-6">Liens utiles</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-sm hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter et réseaux sociaux */}
          <div>
            <h3 className="text-white font-semibold mb-6">Restez connecté</h3>
            <div className="space-y-4">
              <p className="text-sm">
                Recevez nos dernières actualités et offres spéciales
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-primary"
                />
                <Button size="sm" className="shrink-0">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <div className="pt-4">
                <h4 className="text-white font-medium mb-3">Suivez-nous</h4>
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features highlight */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-white">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} RendezVousPro. Tous droits réservés. Made with{" "}
              <Heart className="h-4 w-4 inline text-red-500" /> in France.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              {legalLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.href} 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
