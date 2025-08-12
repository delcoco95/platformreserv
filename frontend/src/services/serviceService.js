const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Service pour les services professionnels
class ServiceService {
  async createService(serviceData) {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData)
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la création du service')
    }

    return data
  }

  async getMyServices() {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/services/my-services`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des services')
    }

    return data
  }

  async updateService(serviceId, serviceData) {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/services/${serviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData)
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la mise à jour du service')
    }

    return data
  }

  async deleteService(serviceId) {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la suppression du service')
    }

    return data
  }

  async toggleServiceStatus(serviceId, isActive) {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/services/${serviceId}/toggle`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isActive })
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors du changement de statut')
    }

    return data
  }

  async getServicesByCategory(category, filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (category) queryParams.append('category', category)
    if (filters.city) queryParams.append('city', filters.city)
    if (filters.priceMin) queryParams.append('priceMin', filters.priceMin)
    if (filters.priceMax) queryParams.append('priceMax', filters.priceMax)
    if (filters.page) queryParams.append('page', filters.page)
    if (filters.limit) queryParams.append('limit', filters.limit)

    const response = await fetch(`${API_URL}/services?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des services')
    }

    return data
  }

  async searchServices(searchTerm, filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (searchTerm) queryParams.append('search', searchTerm)
    if (filters.category) queryParams.append('category', filters.category)
    if (filters.city) queryParams.append('city', filters.city)
    if (filters.priceMin) queryParams.append('priceMin', filters.priceMin)
    if (filters.priceMax) queryParams.append('priceMax', filters.priceMax)
    if (filters.page) queryParams.append('page', filters.page)
    if (filters.limit) queryParams.append('limit', filters.limit)

    const response = await fetch(`${API_URL}/services/search?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la recherche de services')
    }

    return data
  }
}

export default new ServiceService()
