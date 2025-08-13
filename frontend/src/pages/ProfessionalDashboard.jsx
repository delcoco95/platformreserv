import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import bookingService from '../services/bookingService'
import serviceService from '../services/serviceService'
import {
  Calendar,
  Star,
  Settings,
  Plus,
  Edit3,
  Check,
  X,
  MessageCircle,
  Clock,
  Euro,
  Image,
  MapPin,
  Phone,
  Mail,
  User,
  Eye,
  Save,
  Trash2
} from 'lucide-react'

const ProfessionalDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [services, setServices] = useState([])
  const [bookings, setBookings] = useState([])
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)

  // États pour le planning
  const [schedule, setSchedule] = useState({
    monday: { isWorking: true, start: '08:00', end: '18:00' },
    tuesday: { isWorking: true, start: '08:00', end: '18:00' },
    wednesday: { isWorking: true, start: '08:00', end: '18:00' },
    thursday: { isWorking: true, start: '08:00', end: '18:00' },
    friday: { isWorking: true, start: '08:00', end: '18:00' },
    saturday: { isWorking: false, start: '08:00', end: '18:00' },
    sunday: { isWorking: false, start: '08:00', end: '18:00' }
  })
  const [editingSchedule, setEditingSchedule] = useState(false)

  // États pour la modification du profil
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessInfo: {
      companyName: user?.businessInfo?.companyName || '',
      siret: user?.businessInfo?.siret || '',
      businessAddress: {
        street: user?.businessInfo?.businessAddress?.street || '',
        city: user?.businessInfo?.businessAddress?.city || '',
        zipCode: user?.businessInfo?.businessAddress?.zipCode || '',
        country: user?.businessInfo?.businessAddress?.country || 'France'
      },
      profession: user?.businessInfo?.profession || 'automobile',
      description: user?.businessInfo?.description || ''
    }
  })

  // État pour les formulaires
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: user?.businessInfo?.profession || 'automobile'
  })

  // Charger les données depuis l'API
  useEffect(() => {
    loadProfessionalData()
  }, [])

  const loadProfessionalData = async () => {
    try {
      setLoading(true)

      // Charger les services
      try {
        const servicesResponse = await serviceService.getMyServices()
        if (servicesResponse.success) {
          setServices(servicesResponse.services || [])
        }
      } catch (error) {
        console.error('Erreur services:', error)
        setServices([])
      }

      // Charger les réservations
      try {
        const bookingsResponse = await bookingService.getMyBookings()
        if (bookingsResponse.success) {
          setBookings(bookingsResponse.bookings || [])
        }
      } catch (error) {
        console.error('Erreur réservations:', error)
        setBookings([])
      }

      // Les conversations restent vides pour l'instant
      setConversations([])

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleServiceSubmit = (e) => {
    e.preventDefault()
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? 
        { ...serviceForm, id: editingService.id, active: true } : s
      ))
      setEditingService(null)
    } else {
      setServices([...services, { 
        ...serviceForm, 
        id: Date.now(), 
        active: true,
        price: parseFloat(serviceForm.price),
        duration: parseInt(serviceForm.duration)
      }])
    }
    setServiceForm({ name: '', description: '', price: '', duration: '', category: user?.businessInfo?.profession || 'automobile' })
    setShowServiceForm(false)
  }

  const handleBookingAction = async (bookingId, action) => {
    try {
      await bookingService.updateBookingStatus(bookingId, action)
      // Recharger les données
      loadProfessionalData()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
      alert('Erreur lors de la mise à jour du statut')
    }
  }

  // Gestion du planning
  const handleScheduleChange = (day, field, value) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [field]: value
      }
    })
  }

  const saveSchedule = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/users/schedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ schedule })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        alert('Planning sauvegardé avec succès')
        setEditingSchedule(false)
      } else {
        alert(data.message || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Erreur sauvegarde planning:', error)
      alert('Erreur lors de la sauvegarde du planning')
    } finally {
      setLoading(false)
    }
  }

  // Gestion du profil professionnel
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        alert('Profil mis à jour avec succès')
        setEditingProfile(false)
        window.location.reload()
      } else {
        alert(data.message || 'Erreur lors de la mise à jour')
      }
    } catch (error) {
      console.error('Erreur mise à jour profil:', error)
      alert('Erreur lors de la mise à jour du profil')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith('businessInfo.businessAddress.')) {
      const field = name.split('.')[2]
      setProfileForm({
        ...profileForm,
        businessInfo: {
          ...profileForm.businessInfo,
          businessAddress: {
            ...profileForm.businessInfo.businessAddress,
            [field]: value
          }
        }
      })
    } else if (name.startsWith('businessInfo.')) {
      const field = name.split('.')[1]
      setProfileForm({
        ...profileForm,
        businessInfo: {
          ...profileForm.businessInfo,
          [field]: value
        }
      })
    } else {
      setProfileForm({
        ...profileForm,
        [name]: value
      })
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
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    revenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0),
    rating: 4.8
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Professionnel
          </h1>
          <p className="text-gray-600">
            Bienvenue, {user?.firstName} {user?.lastName} - {user?.businessInfo?.companyName}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Vue d\'ensemble', icon: Calendar },
              { id: 'services', name: 'Mes services', icon: Settings },
              { id: 'bookings', name: 'Réservations', icon: Clock },
              { id: 'conversations', name: 'Messages', icon: MessageCircle },
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
                    <p className="text-sm font-medium text-gray-600">Réservations</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">En attente</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Euro className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.revenue}€</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.rating}/5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Réservations récentes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Réservations récentes</h2>
                </div>
                <div className="p-6">
                  {bookings.length > 0 ? (
                    bookings.slice(0, 3).map((booking) => (
                      <div key={booking._id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.clientId?.firstName} {booking.clientId?.lastName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.serviceId?.name} - {new Date(booking.appointmentDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">Aucune réservation</p>
                  )}
                </div>
              </div>

              {/* Planning de la semaine */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Mon planning</h2>
                  <button
                    onClick={() => setEditingSchedule(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Modifier
                  </button>
                </div>
                <div className="p-6">
                  {Object.entries(schedule).map(([day, hours]) => {
                    const dayNames = {
                      monday: 'Lundi',
                      tuesday: 'Mardi',
                      wednesday: 'Mercredi',
                      thursday: 'Jeudi',
                      friday: 'Vendredi',
                      saturday: 'Samedi',
                      sunday: 'Dimanche'
                    }

                    return (
                      <div key={day} className="flex items-center justify-between py-2">
                        <span className="text-sm font-medium text-gray-700">{dayNames[day]}</span>
                        <span className="text-sm text-gray-600">
                          {hours.isWorking ? `${hours.start} - ${hours.end}` : 'Fermé'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mes Services */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Mes services</h2>
              <button
                onClick={() => setShowServiceForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un service
              </button>
            </div>

            {/* Formulaire de service */}
            {showServiceForm && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingService ? 'Modifier le service' : 'Nouveau service'}
                </h3>
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du service
                      </label>
                      <input
                        type="text"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix (€)
                      </label>
                      <input
                        type="number"
                        value={serviceForm.price}
                        onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée (minutes)
                    </label>
                    <input
                      type="number"
                      value={serviceForm.duration}
                      onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowServiceForm(false)
                        setEditingService(null)
                        setServiceForm({ name: '', description: '', price: '', duration: '', category: user?.businessInfo?.profession || 'automobile' })
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {editingService ? 'Modifier' : 'Créer'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Liste des services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                    <button
                      onClick={() => {
                        setEditingService(service)
                        setServiceForm(service)
                        setShowServiceForm(true)
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <p>{service.duration} min</p>
                      <p className="text-lg font-bold text-gray-900">{service.price}€</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.active ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Réservations */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestion des réservations</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Réservations en cours</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{booking.clientName}</h4>
                            <p className="text-sm text-gray-600">{booking.service}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            <p>{booking.date} à {booking.time}</p>
                            <p className="font-medium">{booking.price}€</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {booking.clientPhone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {booking.clientEmail}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                        {booking.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleBookingAction(booking.id, 'confirmed')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                              title="Accepter"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'cancelled')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              title="Refuser"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === 'conversations' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Messagerie</h2>
            
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Conversations</h3>
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
                          <h4 className="text-sm font-medium text-gray-900">{conversation.clientName}</h4>
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
              </div>
            </div>
          </div>
        )}

        {/* Profil */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mon profil professionnel</h2>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-gray-600">{user?.businessInfo?.companyName}</p>
                  <p className="text-sm text-gray-500 capitalize">{user?.businessInfo?.profession}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h4>
                  <div className="space-y-3">
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
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Informations d'entreprise</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">SIRET</label>
                      <p className="text-sm text-gray-900">{user?.businessInfo?.siret || 'Non renseigné'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Adresse</label>
                      <p className="text-sm text-gray-900">
                        {user?.businessInfo?.businessAddress ? 
                          `${user.businessInfo.businessAddress.street}, ${user.businessInfo.businessAddress.zipCode} ${user.businessInfo.businessAddress.city}` :
                          'Non renseignée'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {user?.businessInfo?.description && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{user.businessInfo.description}</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Modifier mon profil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Planning */}
        {editingSchedule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Modifier mon planning</h3>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(schedule).map(([day, hours]) => {
                    const dayNames = {
                      monday: 'Lundi',
                      tuesday: 'Mardi',
                      wednesday: 'Mercredi',
                      thursday: 'Jeudi',
                      friday: 'Vendredi',
                      saturday: 'Samedi',
                      sunday: 'Dimanche'
                    }

                    return (
                      <div key={day} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="w-24">
                          <span className="text-sm font-medium text-gray-700">{dayNames[day]}</span>
                        </div>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={hours.isWorking}
                            onChange={(e) => handleScheduleChange(day, 'isWorking', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">Ouvert</span>
                        </label>

                        {hours.isWorking && (
                          <>
                            <div className="flex items-center space-x-2">
                              <label className="text-sm text-gray-600">De:</label>
                              <input
                                type="time"
                                value={hours.start}
                                onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                                className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <label className="text-sm text-gray-600">À:</label>
                              <input
                                type="time"
                                value={hours.end}
                                onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                                className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingSchedule(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={saveSchedule}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfessionalDashboard
