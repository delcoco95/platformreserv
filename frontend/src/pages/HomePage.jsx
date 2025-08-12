import { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Star, CheckCircle, User, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [searchData, setSearchData] = useState({
    service: '',
    city: '',
    date: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Recherche:', searchData);
    // Redirection vers la page de résultats
  };

  return (
    <div className="min-h-screen bg-white">
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
              <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Quel service ?"
                    value={searchData.service}
                    onChange={(e) => setSearchData({...searchData, service: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Où ?"
                    value={searchData.city}
                    onChange={(e) => setSearchData({...searchData, city: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Rechercher
                </button>
              </form>
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
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.count}</p>
              </div>
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

      {/* Ce qu'on propose */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir RendezVousPro ?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Professionnels vérifiés</h3>
              <p className="text-gray-600">Tous nos partenaires sont certifiés et évalués par la communauté</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Réservation 24h/24</h3>
              <p className="text-gray-600">Prenez rendez-vous à toute heure, même en urgence</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Paiement sécurisé</h3>
              <p className="text-gray-600">Transactions protégées et remboursement garanti</p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Support client</h3>
              <p className="text-gray-600">Une équipe dédiée pour vous accompagner</p>
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
          <Link
            to="/register?type=professionnel"
            className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            Devenir partenaire
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
