import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, User, Building, FileText, MapPin } from 'lucide-react'

const Register = () => {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: searchParams.get('type') || 'client',
    businessInfo: {
      companyName: '',
      siret: '',
      businessAddress: {
        street: '',
        city: '',
        zipCode: '',
        country: 'France'
      },
      profession: 'automobile',
      description: ''
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register } = useAuth()
  const navigate = useNavigate()

  const professions = [
    { value: 'automobile', label: 'Automobile' },
    { value: 'plomberie', label: 'Plomberie' },
    { value: 'serrurerie', label: 'Serrurerie' },
    { value: 'electricite', label: 'Électricité' }
  ]

  const validateForm = () => {
    const errors = []

    // Validation des champs communs
    if (!formData.firstName.trim()) errors.push('Le prénom est obligatoire')
    if (!formData.lastName.trim()) errors.push('Le nom est obligatoire')
    if (!formData.email.trim()) errors.push('L\'email est obligatoire')
    if (!formData.password || formData.password.length < 6) errors.push('Le mot de passe doit contenir au moins 6 caractères')

    // Validation spécifique pour les professionnels
    if (formData.userType === 'professionnel') {
      if (!formData.businessInfo.companyName.trim()) errors.push('Le nom de l\'entreprise est obligatoire')
      if (!formData.businessInfo.siret.trim()) errors.push('Le numéro SIRET est obligatoire')
      if (formData.businessInfo.siret.trim() && !/^\d{14}$/.test(formData.businessInfo.siret.trim())) {
        errors.push('Le SIRET doit contenir exactement 14 chiffres')
      }
      if (!formData.businessInfo.businessAddress.street.trim()) errors.push('L\'adresse de l\'entreprise est obligatoire')
      if (!formData.businessInfo.businessAddress.city.trim()) errors.push('La ville de l\'entreprise est obligatoire')
      if (!formData.businessInfo.businessAddress.zipCode.trim()) errors.push('Le code postal de l\'entreprise est obligatoire')
      if (formData.businessInfo.businessAddress.zipCode.trim() && !/^\d{5}$/.test(formData.businessInfo.businessAddress.zipCode.trim())) {
        errors.push('Le code postal doit contenir exactement 5 chiffres')
      }
      if (!formData.businessInfo.description.trim()) errors.push('La description de votre activité est obligatoire')
      if (formData.businessInfo.description.trim() && formData.businessInfo.description.trim().length < 10) {
        errors.push('La description doit contenir au moins 10 caractères')
      }
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation côté client
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setError(validationErrors[0])
      setLoading(false)
      return
    }

    try {
      const result = await register(formData)
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.message || 'Erreur d\'inscription')
      }
    } catch (error) {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith('businessInfo.businessAddress.')) {
      const field = name.split('.')[2]
      setFormData({
        ...formData,
        businessInfo: {
          ...formData.businessInfo,
          businessAddress: {
            ...formData.businessInfo.businessAddress,
            [field]: value
          }
        }
      })
    } else if (name.startsWith('businessInfo.')) {
      const field = name.split('.')[1]
      setFormData({
        ...formData,
        businessInfo: {
          ...formData.businessInfo,
          [field]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-blue-600">BOOKAUTO</h1>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            connectez-vous à votre compte existant
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Type d'utilisateur */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type de compte
              </label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'client' })}
                  className={`p-3 border rounded-md text-sm font-medium ${
                    formData.userType === 'client'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'professionnel' })}
                  className={`p-3 border rounded-md text-sm font-medium ${
                    formData.userType === 'professionnel'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Professionnel
                </button>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <div className="mt-1 relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Informations professionnelles */}
            {formData.userType === 'professionnel' && (
              <>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Nom de l'entreprise
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="companyName"
                      name="businessInfo.companyName"
                      type="text"
                      required
                      value={formData.businessInfo.companyName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Building className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                    Spécialité
                  </label>
                  <select
                    id="profession"
                    name="businessInfo.profession"
                    value={formData.businessInfo.profession}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {professions.map((prof) => (
                      <option key={prof.value} value={prof.value}>
                        {prof.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="siret" className="block text-sm font-medium text-gray-700">
                    Numéro SIRET *
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="siret"
                      name="businessInfo.siret"
                      type="text"
                      maxLength="14"
                      pattern="[0-9]{14}"
                      value={formData.businessInfo.siret}
                      onChange={handleChange}
                      required={formData.userType === 'professionnel'}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="12345678901234"
                    />
                    <FileText className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">14 chiffres requis</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse de l'entreprise
                  </label>
                  <div className="space-y-3">
                    <div>
                      <input
                        name="businessInfo.businessAddress.street"
                        type="text"
                        placeholder="Adresse complète"
                        value={formData.businessInfo.businessAddress.street}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="businessInfo.businessAddress.zipCode"
                        type="text"
                        placeholder="Code postal"
                        maxLength="5"
                        pattern="[0-9]{5}"
                        value={formData.businessInfo.businessAddress.zipCode}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        name="businessInfo.businessAddress.city"
                        type="text"
                        placeholder="Ville"
                        value={formData.businessInfo.businessAddress.city}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description de votre activité
                  </label>
                  <textarea
                    id="description"
                    name="businessInfo.description"
                    rows={3}
                    value={formData.businessInfo.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Décrivez votre expertise et vos services..."
                  />
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Inscription...' : 'Créer mon compte'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
