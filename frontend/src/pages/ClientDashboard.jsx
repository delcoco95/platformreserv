import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  Star, 
  Clock, 
  MessageCircle, 
  Search,
  Edit3, 
  Eye,
  X,
  Phone,
  Mail,
  User,
  MapPin,
  Filter
} from 'lucide-react'

const ClientDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [conversations, setConversations] = useState([])
  const [favorites, setFavorites] = useState([])

  // Simulations de données (à remplacer par des appels API)
  useEffect(() => {
    // Simulation de réservations
    setBookings([
      {
        id: 1,
        professionalName: 'Garage Martin',
        professionalEmail: 'garage.martin@email.com',
        professionalPhone: '01 23 45 67 89',
        service: 'Vidange complète',
        date: '2024-01-15',
        time: '14:00',
        status: 'confirmed',
        price: 89,
        address: '123 rue de la République, 75001 Paris',
        canCancel: true,
        canModify: true
      },
      {
        id: 2,
        professionalName: 'Auto Service Plus',
        professionalEmail: 'contact@autoservice.com',
        professionalPhone: '01 98 76 54 32',
        service: 'Diagnostic électronique',
        date: '2024-01-20',
        time: '10:30',
        status: 'pending',
        price: 45,
        address: '456 avenue de la Liberté, 75002 Paris',
        canCancel: true,
        canModify: true
      },
      {
        id: 3,
        professionalName: 'Mécanique Express',
        professionalEmail: 'info@mecanique-express.fr',
        professionalPhone: '01 11 22 33 44',
        service: 'Réparation freins',
        date: '2024-01-08',
        time: '16:00',
        status: 'completed',
        price: 120,
        address: '789 boulevard Saint-Michel, 75003 Paris',
        canCancel: false,
        canModify: false,
        rating: 5,
        review: 'Service excellent, très professionnel !'
      }
    ])

    // Simulation de conversations
    setConversations([
      {
        id: 1,
        professionalName: 'Garage Martin',
        lastMessage: 'Merci pour votre réservation, nous vous confirmons le rendez-vous.',
        timestamp: '2024-01-14 16:30',
        unread: false
      },
      {
        id: 2,
        professionalName: 'Auto Service Plus',
        lastMessage: 'Bonjour, pouvez-vous préciser le modèle de votre véhicule ?',
        timestamp: '2024-01-13 14:20',
        unread: true
      }
    ])

    // Simulation de favoris
    setFavorites([
      {
        id: 1,
        name: 'Garage Martin',
        profession: 'Automobile',
        rating: 4.8,
        reviews: 127,
        address: '123 rue de la République, 75001 Paris',
        phone: '01 23 45 67 89'
      }
    ])
  }, [])

  const handleBookingCancel = (bookingId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled', canCancel: false, canModify: false }
          : booking
      ))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'confirmed': return 'Confirmé'
      case 'completed': return 'Terminé'
      case 'cancelled': return 'Annulé'
      default: return status
    }
  }

  const stats = {
    totalBookings: bookings.length,
    upcomingBookings: bookings.filter(b => ['confirmed', 'pending'].includes(b.status)).length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    totalSpent: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Mon espace client
          </h1>
          <p className="text-gray-600">
            Bienvenue, {user?.firstName} {user?.lastName}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Vue d\'ensemble', icon: Calendar },
              { id: 'bookings', name: 'Mes réservations', icon: Clock },
              { id: 'conversations', name: 'Messages', icon: MessageCircle },
              { id: 'favorites', name: 'Mes favoris', icon: Star },
              { id: 'profile', name: 'Mon profil', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total réservations</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">À venir</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.upcomingBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Terminées</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Dépenses</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalSpent}€</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prochains rendez-vous */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Prochains rendez-vous</h2>
              </div>
              <div className="p-6">
                {bookings.filter(b => ['confirmed', 'pending'].includes(b.status)).slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{booking.professionalName}</p>
                      <p className="text-sm text-gray-600">{booking.service} - {booking.date} à {booking.time}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{booking.price}€</p>
                    </div>
                  </div>
                ))}
                {bookings.filter(b => ['confirmed', 'pending'].includes(b.status)).length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    Aucun rendez-vous à venir. 
                    <a href="/professionals" className="text-blue-600 hover:underline ml-1">
                      Réserver un service
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="/professionals"
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left block"
              >
                <div className="flex items-center mb-3">
                  <Search className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="font-medium text-gray-900">Trouver un professionnel</h3>
                </div>
                <p className="text-sm text-gray-600">Découvrez les meilleurs professionnels près de chez vous</p>
              </a>

              <a 
                href="/services"
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left block"
              >
                <div className="flex items-center mb-3">
                  <Calendar className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="font-medium text-gray-900">Nos services</h3>
                </div>
                <p className="text-sm text-gray-600">Explorez tous nos services disponibles</p>
              </a>

              <button 
                onClick={() => setActiveTab('conversations')}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center mb-3">
                  <MessageCircle className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="font-medium text-gray-900">Mes messages</h3>
                </div>
                <p className="text-sm text-gray-600">Communiquez avec vos professionnels</p>
              </button>
            </div>
          </div>
        )}

        {/* Mes Réservations */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Mes réservations</h2>
              <div className="flex space-x-3">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmé</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
                <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{booking.professionalName}</h3>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Date et heure</p>
                          <p className="text-sm text-gray-600">{booking.date} à {booking.time}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Prix</p>
                          <p className="text-sm text-gray-900 font-semibold">{booking.price}€</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Adresse</p>
                          <p className="text-sm text-gray-600">{booking.address}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Contact</p>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {booking.professionalPhone}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {booking.professionalEmail}
                            </p>
                          </div>
                        </div>
                      </div>

                      {booking.status === 'completed' && booking.review && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center mb-2">
                            <div className="flex space-x-1">
                              {[...Array(booking.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-700 ml-2">Mon avis</span>
                          </div>
                          <p className="text-sm text-gray-600">{booking.review}</p>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex flex-col space-y-2">
                      {booking.canModify && (
                        <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                          <Edit3 className="h-4 w-4 mr-2" />
                          Modifier
                        </button>
                      )}
                      {booking.canCancel && (
                        <button 
                          onClick={() => handleBookingCancel(booking.id)}
                          className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Annuler
                        </button>
                      )}
                      {booking.status === 'completed' && !booking.review && (
                        <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          <Star className="h-4 w-4 mr-2" />
                          Noter
                        </button>
                      )}
                      <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === 'conversations' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mes conversations</h2>
            
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Messages</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="p-6 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{conversation.professionalName}</h4>
                          <p className="text-sm text-gray-600">{conversation.lastMessage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                        {conversation.unread && (
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-1"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {conversations.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    Aucune conversation pour le moment.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Favoris */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mes professionnels favoris</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{favorite.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{favorite.profession}</p>
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(favorite.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {favorite.rating} ({favorite.reviews} avis)
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {favorite.address}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {favorite.phone}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                      Contacter
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {favorites.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun favori</h3>
                  <p className="text-gray-600 mb-4">
                    Ajoutez des professionnels à vos favoris pour les retrouver facilement.
                  </p>
                  <a 
                    href="/professionals"
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Découvrir des professionnels
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profil */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mon profil</h2>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Client
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Prénom</label>
                      <p className="text-sm text-gray-900">{user?.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom</label>
                      <p className="text-sm text-gray-900">{user?.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                      <p className="text-sm text-gray-900">{user?.phone || 'Non renseigné'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Adresse</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Adresse complète</label>
                      <p className="text-sm text-gray-900">
                        {user?.address ? 
                          `${user.address.street}, ${user.address.zipCode} ${user.address.city}` :
                          'Non renseignée'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Modifier mes informations
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientDashboard
