import { useState, useEffect } from 'react';
import { Calendar, Clock, User, CreditCard, Star, MessageCircle } from 'lucide-react';
import { useAuth } from '@contexts/AuthContext';
import { bookingsService } from '@services/api';
import LoadingSpinner from '@components/LoadingSpinner';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsService.getAll();
      const bookingsData = response.data || [];
      setBookings(bookingsData);
      
      // Calculer les stats
      setStats({
        total: bookingsData.length,
        upcoming: bookingsData.filter(b => b.status === 'confirmed' && new Date(b.appointmentDate) > new Date()).length,
        completed: bookingsData.filter(b => b.status === 'completed').length,
        cancelled: bookingsData.filter(b => b.status.includes('cancelled')).length
      });
    } catch (error) {
      console.error('Erreur chargement réservations:', error);
    } finally {
      setLoading(false);
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
      cancelled_by_client: 'Annulé',
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
          Bonjour {user?.firstName} !
        </h1>
        <p className="text-gray-600 mt-2">
          Gérez vos rendez-vous et découvrez de nouveaux services
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total réservations</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
              <p className="text-sm text-gray-600">À venir</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-sm text-gray-600">Terminés</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">€ 0</p>
              <p className="text-sm text-gray-600">Dépensé ce mois</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <button className="card p-6 text-left hover:shadow-lg transition-shadow">
          <User className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold mb-2">Trouver un professionnel</h3>
          <p className="text-sm text-gray-600">Découvrez nos professionnels qualifiés</p>
        </button>
        
        <button className="card p-6 text-left hover:shadow-lg transition-shadow">
          <Calendar className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold mb-2">Mes rendez-vous</h3>
          <p className="text-sm text-gray-600">Gérez vos réservations</p>
        </button>
        
        <button className="card p-6 text-left hover:shadow-lg transition-shadow">
          <MessageCircle className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold mb-2">Messages</h3>
          <p className="text-sm text-gray-600">Communiquez avec vos pros</p>
        </button>
      </div>

      {/* Réservations récentes */}
      <div className="card">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Mes réservations</h2>
        </div>
        
        <div className="p-6">
          {loading ? (
            <LoadingSpinner text="Chargement des réservations..." />
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Service réservé</h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(booking.appointmentDate)}
                    </p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="font-semibold">€{booking.pricing?.totalPrice || 'N/A'}</p>
                  </div>
                  <div>
                    {getStatusBadge(booking.status)}
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
              <p className="text-gray-600 mb-4">
                Commencez par réserver votre premier service
              </p>
              <button className="btn btn-primary">
                Découvrir les services
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
