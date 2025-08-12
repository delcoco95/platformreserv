const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  // Ajouter le token d'authentification si disponible
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur réseau')
    }
    
    return data
  } catch (error) {
    console.error('Erreur API:', error)
    throw error
  }
}

// Services spécifiques
export const userService = {
  getProfile: () => apiCall('/api/users/profile'),
  updateProfile: (data) => apiCall('/api/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getProfessionals: (params = {}) => {
    const searchParams = new URLSearchParams(params)
    return apiCall(`/api/users/professionals?${searchParams}`)
  },
  getProfessional: (id) => apiCall(`/api/users/professionals/${id}`)
}

export const serviceService = {
  getServices: (params = {}) => {
    const searchParams = new URLSearchParams(params)
    return apiCall(`/api/services?${searchParams}`)
  },
  getService: (id) => apiCall(`/api/services/${id}`),
  createService: (data) => apiCall('/api/services', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateService: (id, data) => apiCall(`/api/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteService: (id) => apiCall(`/api/services/${id}`, {
    method: 'DELETE'
  })
}

export const bookingService = {
  getMyBookings: (params = {}) => {
    const searchParams = new URLSearchParams(params)
    return apiCall(`/api/bookings/my-bookings?${searchParams}`)
  },
  getBooking: (id) => apiCall(`/api/bookings/${id}`),
  createBooking: (data) => apiCall('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateBookingStatus: (id, data) => apiCall(`/api/bookings/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}
