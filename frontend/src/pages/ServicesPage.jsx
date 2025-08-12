const ServicesPage = () => {
  const services = [
    {
      category: 'automobile',
      title: 'Services Automobile',
      description: 'Mécaniciens, carrossiers, dépannage',
      icon: '🚗',
      count: '120+ pros'
    },
    {
      category: 'plomberie',
      title: 'Plomberie',
      description: 'Dépannage, installation, rénovation',
      icon: '🔧',
      count: '89+ pros'
    },
    {
      category: 'serrurerie',
      title: 'Serrurerie',
      description: 'Ouverture de porte, installation',
      icon: '🗝️',
      count: '65+ pros'
    },
    {
      category: 'electricite',
      title: 'Électricité',
      description: 'Installation, dépannage électrique',
      icon: '⚡',
      count: '78+ pros'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tous nos services
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre large gamme de services professionnels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.category} className="card card-hover p-8 text-center">
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-sm text-blue-600 font-medium mb-6">{service.count}</p>
              <button className="btn btn-primary w-full">
                Voir les professionnels
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
