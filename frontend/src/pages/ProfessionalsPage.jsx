import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, Euro } from 'lucide-react';
import { servicesService } from '@services/api';
import LoadingSpinner from '@components/LoadingSpinner';

const ProfessionalsPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    search: ''
  });

  useEffect(() => {
    loadServices();
  }, [filters]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await servicesService.getAll(filters);
      setServices(response.data.services || []);
    } catch (error) {
      console.error('Erreur chargement services:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: '', label: 'Tous les services' },
    { value: 'automobile', label: 'Automobile' },
    { value: 'plomberie', label: 'Plomberie' },
    { value: 'serrurerie', label: 'Serrurerie' },
    { value: 'electricite', label: 'Électricité' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trouvez votre professionnel
          </h1>
          <p className="text-xl text-gray-600">
            Des milliers de professionnels qualifiés à votre service
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="input pl-12"
              />
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="input"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ville..."
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
                className="input pl-12"
              />
            </div>
          </div>
        </div>

        {/* Résultats */}
        {loading ? (
          <LoadingSpinner text="Chargement des professionnels..." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service._id} className="card card-hover p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                    <span className="badge badge-primary">{service.category}</span>
                  </div>
                  
                  {service.professionalId && (
                    <div className="mb-4">
                      <p className="font-medium">
                        {service.professionalId.firstName} {service.professionalId.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {service.professionalId.businessInfo?.companyName}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} min
                    </div>
                    <div className="flex items-center text-lg font-semibold text-blue-600">
                      <Euro className="w-4 h-4 mr-1" />
                      {service.price}
                    </div>
                  </div>
                  
                  {service.professionalId?.stats && (
                    <div className="flex items-center mb-4">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">
                        {service.professionalId.stats.averageRating || 'N/A'} 
                        ({service.professionalId.stats.totalReviews || 0} avis)
                      </span>
                    </div>
                  )}
                  
                  <button className="btn btn-primary w-full">
                    Réserver
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 mb-4">Aucun professionnel trouvé</p>
                <button
                  onClick={() => setFilters({ category: '', city: '', search: '' })}
                  className="btn btn-outline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsPage;
