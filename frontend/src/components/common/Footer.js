import { Link } from "react-router-dom";
import { Calendar, Mail, Phone, MapPin, Car, Wrench, Key, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    {
      id: "automobile",
      label: "Automobile", 
      icon: Car,
      description: "Entretien et réparation",
      link: "/professionnels?categorie=automobile",
    },
    {
      id: "plomberie",
      label: "Plomberie",
      icon: Wrench, 
      description: "Installation et dépannage",
      link: "/professionnels?categorie=plomberie",
    },
    {
      id: "serrurerie",
      label: "Serrurerie",
      icon: Key,
      description: "Sécurité et urgences", 
      link: "/professionnels?categorie=serrurerie",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                BookAuto
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              La plateforme de référence pour réserver vos services automobiles.
              Trouvez le professionnel qu'il vous faut en quelques clics.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>Service disponible dans toute la France</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <a
                  href="tel:+33123456789"
                  className="hover:text-white transition-colors"
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <a
                  href="mailto:contact@bookauto.fr"
                  className="hover:text-white transition-colors"
                >
                  contact@bookauto.fr
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Nos services
            </h3>
            <div className="space-y-4">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Link
                    key={service.id}
                    to={service.link}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <IconComponent className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        {service.label}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Liens rapides
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/comment-ca-marche"
                  className="text-sm hover:text-white transition-colors"
                >
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link
                  to="/inscription"
                  className="text-sm hover:text-white transition-colors"
                >
                  Devenir professionnel
                </Link>
              </li>
              <li>
                <Link
                  to="/garanties"
                  className="text-sm hover:text-white transition-colors"
                >
                  Nos garanties
                </Link>
              </li>
              <li>
                <Link
                  to="/aide"
                  className="text-sm hover:text-white transition-colors"
                >
                  Aide et support
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Mentions légales */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Informations légales
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/mentions-legales"
                  className="text-sm hover:text-white transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="/conditions"
                  className="text-sm hover:text-white transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  to="/confidentialite"
                  className="text-sm hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-sm hover:text-white transition-colors"
                >
                  Gestion des cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {currentYear} BookAuto. Tous droits réservés.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
