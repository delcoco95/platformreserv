const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Service pour les réservations
class BookingService {
  async createBooking(bookingData) {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la création de la réservation')
    }

    return data
  }

  async getMyBookings(filters = {}) {
    const token = localStorage.getItem('token')
    const queryParams = new URLSearchParams()
    
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.page) queryParams.append('page', filters.page)
    if (filters.limit) queryParams.append('limit', filters.limit)

    const response = await fetch(`${API_URL}/bookings/my-bookings?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des réservations')
    }

    return data
  }

  async getBookingById(bookingId) {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération de la réservation')
    }

    return data
  }

  async updateBookingStatus(bookingId, status, professionalResponse = '') {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status, professionalResponse })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la mise à jour du statut')
    }

    return data
  }

  async cancelBooking(bookingId) {
    return this.updateBookingStatus(bookingId, 'cancelled')
  }

  async confirmBooking(bookingId, response = '') {
    return this.updateBookingStatus(bookingId, 'confirmed', response)
  }

  async completeBooking(bookingId, response = '') {
    return this.updateBookingStatus(bookingId, 'completed', response)
  }
}

export default new BookingService()
