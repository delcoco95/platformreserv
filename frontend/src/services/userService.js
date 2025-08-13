const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Service pour les utilisateurs
class UserService {
  async getProfessionals(filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (filters.category) queryParams.append('category', filters.category)
    if (filters.city) queryParams.append('city', filters.city)
    if (filters.page) queryParams.append('page', filters.page)
    if (filters.limit) queryParams.append('limit', filters.limit)

    const response = await fetch(`${API_URL}/users/professionals?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des professionnels')
    }

    return data
  }

  async getProfessionalById(professionalId) {
    const response = await fetch(`${API_URL}/users/professionals/${professionalId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération du professionnel')
    }

    return data
  }

  async updateProfile(profileData) {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la mise à jour du profil')
    }

    return data
  }

  async getProfile() {
    const token = localStorage.getItem('token')
    
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération du profil')
    }

    return data
  }
}

export default new UserService()
