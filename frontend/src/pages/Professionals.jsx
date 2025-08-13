import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import userService from '../services/userService'
import { Search, MapPin, Star, Phone, Mail } from 'lucide-react'

const Professionals = () => {
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'automobile', label: 'Automobile' },
    { value: 'plomberie', label: 'Plomberie' },
    { value: 'serrurerie', label: 'Serrurerie' },
    { value: 'electricite', label: 'Électricité' }
  ]

  useEffect(() => {
    fetchProfessionals()
  }, [selectedCategory])

  const fetchProfessionals = async () => {
    try {
      setLoading(true)
      const params = {}
      if (selectedCategory) {
        params.category = selectedCategory
      }
      
      const response = await userService.getProfessionals(params)
      if (response.success) {
        setProfessionals(response.professionals)
      }
    } catch (error) {
      console.error('Erreur chargement professionnels:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProfessionals = professionals.filter(prof => 
    prof.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (prof.businessInfo?.companyName && prof.businessInfo.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos professionnels
          </h1>
          <p className="text-xl text-gray-600">
            Trouvez le professionnel qu'il vous faut près de chez vous
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un professionnel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredProfessionals.length} professionnel{filteredProfessionals.length > 1 ? 's' : ''} trouvé{filteredProfessionals.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Professionals Grid */}
        {filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <div key={professional._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {professional.firstName[0]}{professional.lastName[0]}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">
                        {professional.firstName} {professional.lastName}
                      </h3>
                      {professional.businessInfo?.companyName && (
                        <p className="text-sm text-gray-600">
                          {professional.businessInfo.companyName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Profession */}
                  {professional.businessInfo?.profession && (
                    <div className="mb-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {professional.businessInfo.profession}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {professional.businessInfo?.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {professional.businessInfo.description}
                    </p>
                  )}

                  {/* Contact info */}
                  <div className="space-y-2 mb-4">
                    {professional.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {professional.email}
                      </div>
                    )}
                    {professional.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {professional.phone}
                      </div>
                    )}
                    {professional.address?.city && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {professional.address.city}
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">5.0 (0 avis)</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Voir le profil
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun professionnel trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Professionals
