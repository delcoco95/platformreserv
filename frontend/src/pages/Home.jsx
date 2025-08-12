import { Link } from 'react-router-dom'
import { Search, Calendar, CheckCircle, Star, Clock, Shield, Car, Wrench, Key, Zap } from 'lucide-react'

const Home = () => {
  const services = [
    {
      icon: Car,
      name: 'Automobile',
      description: 'Entretien, réparation, diagnostic',
      count: '120+ pros'
    },
    {
      icon: Wrench,
      name: 'Plomberie',
      description: 'Dépannage, installation, rénovation',
      count: '89+ pros'
    },
    {
      icon: Key,
      name: 'Serrurerie',
      description: 'Ouverture, installation, sécurité',
      count: '65+ pros'
    },
    {
      icon: Zap,
      name: 'Électricité',
      description: 'Installation, dépannage électrique',
      count: '78+ pros'
    }
  ]

  const features = [
    {
      icon: Star,
      title: 'Professionnels vérifiés',
      description: 'Tous nos partenaires sont certifiés et évalués'
    },
    {
      icon: Clock,
      title: 'Réservation 24h/24',
      description: 'Prenez rendez-vous à toute heure'
    },
    {
      icon: Shield,
      title: 'Paiement sécurisé',
      description: 'Transactions protégées et garanties'
    }
  ]

  const steps = [
    {
      icon: Search,
      title: 'Recherchez',
      description: 'Trouvez le professionnel qu\'il vous faut'
    },
    {
      icon: Calendar,
      title: 'Réservez',
      description: 'Choisissez votre créneau en ligne'
    },
    {
      icon: CheckCircle,
      title: 'C\'est fait !',
      description: 'Profitez de votre service'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Trouvez le bon professionnel,
              <span className="text-blue-600 block">au bon moment</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Réservez en ligne vos rendez-vous avec des professionnels de confiance
              près de chez vous. Simple, rapide et sécurisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Voir les services
              </Link>
              <Link
                to="/professionals"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Trouver un professionnel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Services les plus demandés
            </h2>
            <p className="text-gray-600">
              Découvrez notre large gamme de services professionnels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <p className="text-blue-600 font-medium text-sm">{service.count}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-600">
              Réservez un service en 3 étapes simples
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir BookAuto ?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vous êtes un professionnel ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez notre réseau et développez votre activité
          </p>
          <Link
            to="/register?type=professionnel"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Devenir partenaire
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
