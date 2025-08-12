import { Car, Wrench, Key, Zap } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Car,
      name: 'Automobile',
      description: 'Entretien, réparation, diagnostic, carrosserie',
      count: '120+ professionnels',
      color: 'blue'
    },
    {
      icon: Wrench,
      name: 'Plomberie',
      description: 'Dépannage, installation, rénovation, urgences',
      count: '89+ professionnels',
      color: 'cyan'
    },
    {
      icon: Key,
      name: 'Serrurerie',
      description: 'Ouverture, installation, sécurité, blindage',
      count: '65+ professionnels',
      color: 'yellow'
    },
    {
      icon: Zap,
      name: 'Électricité',
      description: 'Installation, dépannage, mise aux normes',
      count: '78+ professionnels',
      color: 'orange'
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    cyan: 'bg-cyan-100 text-cyan-600 border-cyan-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tous nos services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre large gamme de services professionnels à domicile.
            Des experts qualifiés près de chez vous.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const colorClass = colorClasses[service.color]
            
            return (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${colorClass}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">
                      {service.count}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Voir les pros
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-blue-100 mb-6">
            Contactez-nous pour nous faire part de vos besoins spécifiques
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services
