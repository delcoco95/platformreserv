import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import bookingService from '../services/bookingService'
import serviceService from '../services/serviceService'
import { Calendar, Clock, Euro, MapPin, User, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react'

const BookingPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const serviceId = searchParams.get('serviceId')

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    clientMessage: '',
    serviceAddress: {
      street: '',
      city: '',
      zipCode: ''
    },
    isHomeService: false
  })

  useEffect(() => {
    if (!user || user.userType !== 'client') {
      navigate('/login')
      return
    }

    if (!serviceId) {
      navigate('/professionals')
      return
    }

    loadService()
  }, [serviceId, user, navigate])

  const loadService = async () => {
    try {
      // Pour cet exemple, on simule la récupération d'un service
      // Dans un vrai cas, on ferait un appel à l'API
      setService({
        _id: serviceId,
        name: 'Vidange complète',
        description: 'Vidange moteur + filtres à huile et air + vérification complète',
        price: 89,
        duration: 60,
        category: 'automobile',
        professional: {
          _id: 'prof1',
          firstName: 'Pierre',
          lastName: 'Martin',
          businessInfo: {
            companyName: 'Garage Martin',
            businessAddress: {
              street: '123 rue de la République',
              city: 'Paris',
              zipCode: '75001'
            }
          },
          email: 'pierre.martin@garage.com',
          phone: '01 23 45 67 89'
        },
        homeService: false
      })
    } catch (error) {
      setError('Erreur lors du chargement du service')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      // Validation
      if (!formData.appointmentDate || !formData.appointmentTime) {
        throw new Error('Veuillez sélectionner une date et heure')
      }

      if (formData.isHomeService && (!formData.serviceAddress.street || !formData.serviceAddress.city || !formData.serviceAddress.zipCode)) {
        throw new Error('Veuillez renseigner l\'adresse pour le service à domicile')
      }

      // Créer la date de rendez-vous
      const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`)

      if (appointmentDateTime <= new Date()) {
        throw new Error('La date de rendez-vous doit être dans le futur')
      }

      const bookingData = {
        serviceId: service._id,
        appointmentDate: appointmentDateTime.toISOString(),
        clientMessage: formData.clientMessage,
        serviceAddress: formData.isHomeService ? formData.serviceAddress : null
      }

      await bookingService.createBooking(bookingData)
      setSuccess(true)

      // Rediriger vers le dashboard après 2 secondes
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)

    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.startsWith('serviceAddress.')) {
      const field = name.split('.')[1]
      setFormData({
        ...formData,
        serviceAddress: {
          ...formData.serviceAddress,
          [field]: value
        }
      })
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  // Générer les créneaux horaires disponibles
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(timeString)
      }
    }
    return slots
  }

  // Obtenir la date minimale (demain)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Service non trouvé</h2>
          <p className="text-gray-600">Le service demandé n'existe pas ou n'est plus disponible.</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Réservation confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Votre demande de réservation a été envoyée au professionnel. 
            Vous recevrez une confirmation par email.
          </p>
          <div className="text-sm text-gray-500">
            Redirection vers votre tableau de bord...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Réserver un service</h1>
          <p className="text-gray-600">Complétez les informations pour finaliser votre réservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations du service */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails du service</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {service.duration} minutes
                </div>

                <div className="flex items-center text-lg font-semibold text-gray-900">
                  <Euro className="h-5 w-5 mr-1" />
                  {service.price}€
                </div>

                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Professionnel</h5>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{service.professional.businessInfo.companyName}</p>
                    <p className="text-sm text-gray-600">
                      {service.professional.firstName} {service.professional.lastName}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {service.professional.businessInfo.businessAddress.street},<br />
                        {service.professional.businessInfo.businessAddress.zipCode} {service.professional.businessInfo.businessAddress.city}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-1" />
                      {service.professional.phone}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-1" />
                      {service.professional.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de réservation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations de réservation</h3>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <p className="text-red-800">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date et heure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date souhaitée *
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      min={getMinDate()}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heure souhaitée *
                    </label>
                    <select
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionnez une heure</option>
                      {generateTimeSlots().map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service à domicile */}
                {service.homeService && (
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isHomeService"
                        checked={formData.isHomeService}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Service à domicile (+10€)</span>
                    </label>
                  </div>
                )}

                {/* Adresse du service */}
                {formData.isHomeService && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse d'intervention *
                    </label>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="serviceAddress.street"
                        placeholder="Adresse complète"
                        value={formData.serviceAddress.street}
                        onChange={handleChange}
                        required={formData.isHomeService}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="serviceAddress.zipCode"
                          placeholder="Code postal"
                          value={formData.serviceAddress.zipCode}
                          onChange={handleChange}
                          required={formData.isHomeService}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="text"
                          name="serviceAddress.city"
                          placeholder="Ville"
                          value={formData.serviceAddress.city}
                          onChange={handleChange}
                          required={formData.isHomeService}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Message au professionnel */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message au professionnel (optionnel)
                  </label>
                  <textarea
                    name="clientMessage"
                    value={formData.clientMessage}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Décrivez votre besoin, précisez des détails importants..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Récapitulatif du prix */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Prix du service</span>
                    <span className="text-sm text-gray-900">{service.price}€</span>
                  </div>
                  {formData.isHomeService && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium text-gray-700">Supplément à domicile</span>
                      <span className="text-sm text-gray-900">+10€</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-lg text-gray-900">
                      {service.price + (formData.isHomeService ? 10 : 0)}€
                    </span>
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
