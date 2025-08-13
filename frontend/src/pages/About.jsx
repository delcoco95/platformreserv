import { Users, Target, Shield, Heart, Zap, CheckCircle } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Professionnels vérifiés",
      description: "Tous nos partenaires sont vérifiés et qualifiés dans leur domaine"
    },
    {
      icon: Zap,
      title: "Service rapide",
      description: "Trouvez un professionnel disponible rapidement près de chez vous"
    },
    {
      icon: CheckCircle,
      title: "Qualité garantie",
      description: "Des prestations de qualité avec un système d'avis clients"
    },
    {
      icon: Heart,
      title: "Service client",
      description: "Une équipe dédiée pour vous accompagner à chaque étape"
    }
  ]

  const stats = [
    { number: "500+", label: "Professionnels partenaires" },
    { number: "10,000+", label: "Interventions réalisées" },
    { number: "4.8/5", label: "Note moyenne clients" },
    { number: "24h", label: "Délai moyen de réponse" }
  ]

  const team = [
    {
      name: "Hedi",
      role: "CEO",
      description: "Fondateur et dirigeant de BOOKAUTO, expert en digital et services aux particuliers"
    },
    {
      name: "Nedj",
      role: "Directeur Technique",
      description: "Architecte et développeur de la plateforme, spécialisé dans les technologies web modernes"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">À propos de BOOKAUTO</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            La plateforme qui révolutionne la mise en relation entre particuliers et professionnels 
            dans les domaines de l'automobile, la plomberie, la serrurerie et l'électricité.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-12 w-12 text-blue-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">Notre mission</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                BOOKAUTO a été créé avec une mission simple : faciliter l'accès à des services 
                professionnels de qualité pour tous les particuliers, tout en offrant aux 
                artisans et professionnels une plateforme pour développer leur activité.
              </p>
              <p className="text-lg text-gray-600">
                Nous croyons que chacun mérite d'avoir accès à des professionnels compétents 
                et fiables, que ce soit pour un dépannage urgent ou un projet planifié.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Nos valeurs</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Confiance</h4>
                    <p className="text-gray-600">Vérification rigoureuse de tous nos partenaires</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Simplicité</h4>
                    <p className="text-gray-600">Une plateforme intuitive et facile d'utilisation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Qualité</h4>
                    <p className="text-gray-600">Des prestations de service irréprochables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir BOOKAUTO ?</h2>
            <p className="text-xl text-gray-600">
              Une plateforme pensée pour vous simplifier la vie
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">BOOKAUTO en chiffres</h2>
            <p className="text-xl text-blue-100">
              La confiance de milliers d'utilisateurs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Notre équipe</h2>
            </div>
            <p className="text-xl text-gray-600">
              Des professionnels passionnés au service de votre satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Prêt à rejoindre l'aventure BOOKAUTO ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Que vous soyez un particulier à la recherche d'un professionnel ou un artisan 
            souhaitant développer votre activité, BOOKAUTO est fait pour vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register?type=client"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Je suis un client
            </a>
            <a
              href="/register?type=professionnel"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Je suis un professionnel
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
