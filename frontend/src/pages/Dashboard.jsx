import { useAuth } from '../contexts/AuthContext'
import { User, Calendar, Star, Settings } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Bienvenue, {user?.firstName} {user?.lastName}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rendez-vous</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avis</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Services</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Mon profil</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-gray-600">{user?.email}</p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  user?.userType === 'professionnel' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user?.userType === 'professionnel' ? 'Professionnel' : 'Client'}
                </span>
              </div>
            </div>

            {user?.userType === 'professionnel' && user?.businessInfo && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Informations professionnelles
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Entreprise</p>
                    <p className="text-sm text-gray-900">
                      {user.businessInfo.companyName || 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Spécialité</p>
                    <p className="text-sm text-gray-900">
                      {user.businessInfo.profession || 'Non renseigné'}
                    </p>
                  </div>
                  {user.businessInfo.description && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-600">Description</p>
                      <p className="text-sm text-gray-900">{user.businessInfo.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.userType === 'professionnel' ? (
              <>
                <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
                  <h4 className="font-medium text-gray-900">Créer un service</h4>
                  <p className="text-sm text-gray-600 mt-1">Ajoutez un nouveau service à votre offre</p>
                </button>
                <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
                  <h4 className="font-medium text-gray-900">Gérer les réservations</h4>
                  <p className="text-sm text-gray-600 mt-1">Consultez vos rendez-vous à venir</p>
                </button>
                <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
                  <h4 className="font-medium text-gray-900">Modifier mon profil</h4>
                  <p className="text-sm text-gray-600 mt-1">Mettez à jour vos informations</p>
                </button>
              </>
            ) : (
              <>
                <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
                  <h4 className="font-medium text-gray-900">Rechercher un service</h4>
                  <p className="text-sm text-gray-600 mt-1">Trouvez le professionnel qu'il vous faut</p>
                </button>
                <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
                  <h4 className="font-medium text-gray-900">Mes réservations</h4>
                  <p className="text-sm text-gray-600 mt-1">Consultez vos rendez-vous</p>
                </button>
                <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
                  <h4 className="font-medium text-gray-900">Mon historique</h4>
                  <p className="text-sm text-gray-600 mt-1">Voir vos services passés</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
