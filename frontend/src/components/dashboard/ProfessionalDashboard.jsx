import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Euro, 
  Star, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Edit,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '@contexts/AuthContext';
import { bookingsService, servicesService } from '@services/api';
import LoadingSpinner from '@components/LoadingSpinner';

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    averageRating: 0,
    totalReviews: 0,
    pendingBookings: 0,
    confirmedBookings: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Charger les réservations
      const bookingsResponse = await bookingsService.getAll();
      const bookingsData = bookingsResponse.data || [];
      setBookings(bookingsData);
      
      // Charger les services
      const servicesResponse = await servicesService.getByProfessional(user._id);
      const servicesData = servicesResponse.data || [];
      setServices(servicesData);
      
      // Calculer les statistiques
      const completedBookings = bookingsData.filter(b => b.status === 'completed');
      const totalRevenue = completedBookings.reduce((sum, booking) => {
        return sum + (booking.pricing?.totalPrice || 0);
      }, 0);
      
      setStats({
        totalRevenue,
        totalBookings: bookingsData.length,
        averageRating: user.stats?.averageRating || 0,
        totalReviews: user.stats?.totalReviews || 0,
        pendingBookings: bookingsData.filter(b => b.status === 'pending').length,
        confirmedBookings: bookingsData.filter(b => b.status === 'confirmed').length
      });
      
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      if (action === 'confirm') {
        await bookingsService.confirm(bookingId);
      } else if (action === 'cancel') {
        await bookingsService.cancel(bookingId, 'Annulé par le professionnel');
      }
      
      // Recharger les données
      loadDashboardData();
    } catch (error) {
      console.error('Erreur action réservation:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge badge-warning',
      confirmed: 'badge badge-success',
      completed: 'badge badge-secondary',
      cancelled_by_client: 'badge badge-danger',
      cancelled_by_professional: 'badge badge-danger'
    };
    
    const labels = {
      pending: 'En attente',
      confirmed: 'Confirmé',
      completed: 'Terminé',
      cancelled_by_client: 'Annulé par client',
      cancelled_by_professional: 'Annulé'
    };
    
    return (
      <span className={badges[status] || 'badge badge-secondary'}>
        {labels[status] || status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de bord professionnel
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.businessInfo?.companyName || `${user?.firstName} ${user?.lastName}`}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center">
            <Euro className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                €{stats.totalRevenue.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Chiffre d'affaires</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              <p className="text-sm text-gray-600">Total réservations</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">{stats.totalReviews} avis</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
              <p className="text-sm text-gray-600">En attente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Réservations récentes */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Réservations récentes</h2>
            </div>
            
            <div className="p-6">
              {loading ? (
                <LoadingSpinner text="Chargement des réservations..." />
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">Client</h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(booking.appointmentDate)}
                        </p>
                        <p className="text-sm text-gray-600">
                          €{booking.pricing?.totalPrice || 'N/A'}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(booking.status)}
                        
                        {booking.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleBookingAction(booking._id, 'confirm')}
                              className="btn btn-primary btn-sm"
                              title="Confirmer"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking._id, 'cancel')}
                              className="btn btn-danger btn-sm"
                              title="Refuser"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune réservation
                  </h3>
                  <p className="text-gray-600">
                    Les réservations apparaîtront ici
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="space-y-6">
          {/* Mes services */}
          <div className="card">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Mes services</h2>
                <button className="btn btn-primary btn-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {services.length > 0 ? (
                <div className="space-y-3">
                  {services.slice(0, 3).map((service) => (
                    <div key={service._id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-gray-600">€{service.price}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">Aucun service configuré</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="card p-4 w-full text-left hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">Gérer mon agenda</p>
                  <p className="text-sm text-gray-600">Disponibilités</p>
                </div>
              </div>
            </button>
            
            <button className="card p-4 w-full text-left hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Statistiques</p>
                  <p className="text-sm text-gray-600">Performance</p>
                </div>
              </div>
            </button>
            
            <button className="card p-4 w-full text-left hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-gray-600">Clients</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
