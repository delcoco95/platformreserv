import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Search, Calendar, MapPin, Star, CheckCircle } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trouvez le bon professionnel,
              <span className="text-blue-600 block">au bon moment</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Réservez en ligne vos rendez-vous avec des professionnels de confiance
              près de chez vous. Simple, rapide et sécurisé.
            </p>
            
            {/* Barre de recherche */}
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Quel service ?"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Où ?"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button size="lg" className="py-4 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services populaires */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Services les plus demandés</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Automobile', icon: '🚗', count: '120+ pros' },
              { name: 'Plomberie', icon: '🔧', count: '89+ pros' },
              { name: 'Serrurerie', icon: '🗝️', count: '65+ pros' },
              { name: 'Beauté', icon: '💅', count: '200+ pros' }
            ].map((service, index) => (
              <Link key={index} to={`/professionnels?categorie=${service.name.toLowerCase()}`}>
                <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl mb-4">1. Recherchez</h3>
              <p className="text-gray-600">
                Trouvez le professionnel qu'il vous faut parmi nos milliers de partenaires qualifiés
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-xl mb-4">2. Réservez</h3>
              <p className="text-gray-600">
                Choisissez votre créneau et payez en ligne en toute sécurité
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-xl mb-4">3. C'est fait !</h3>
              <p className="text-gray-600">
                Profitez de votre service et laissez un avis pour aider la communauté
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vous êtes un professionnel ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez notre réseau et développez votre activité
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/inscription">
              Devenir partenaire
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
