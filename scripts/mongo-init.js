// Script d'initialisation MongoDB pour BookAuto
db = db.getSiblingDB('platformreserv');

// Créer un utilisateur admin (optionnel)
db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'platformreserv'
    }
  ]
});

// Créer les index pour optimiser les performances
db.users.createIndex({ email: 1 }, { unique: true });
db.services.createIndex({ professionalId: 1, category: 1 });
db.bookings.createIndex({ clientId: 1, status: 1 });
db.bookings.createIndex({ professionalId: 1, status: 1 });
db.bookings.createIndex({ appointmentDate: 1 });

// Insérer des données de test (optionnel)
db.users.insertMany([
  {
    email: 'client@test.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeB45kKOQHbJ5Baw6', // password: 123456
    userType: 'client',
    firstName: 'Jean',
    lastName: 'Dupont',
    isActive: true,
    isVerified: true,
    stats: {
      totalBookings: 0,
      totalRevenue: 0,
      averageRating: 0,
      totalReviews: 0
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'pro@test.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeB45kKOQHbJ5Baw6', // password: 123456
    userType: 'professionnel',
    firstName: 'Marie',
    lastName: 'Martin',
    businessInfo: {
      companyName: 'Martin Auto Services',
      profession: 'automobile',
      description: 'Spécialiste en mécanique automobile depuis 15 ans'
    },
    isActive: true,
    isVerified: true,
    stats: {
      totalBookings: 0,
      totalRevenue: 0,
      averageRating: 0,
      totalReviews: 0
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Base de données BookAuto initialisée avec succès!');
