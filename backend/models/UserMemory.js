// Modèle User en mémoire pour le développement
class UserMemory {
  constructor(data) {
    this._id = this.generateId();
    this.email = data.email;
    this.password = data.password;
    this.userType = data.userType;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.companyName = data.companyName;
    this.profession = data.profession;
    this.siret = data.siret;
    this.phone = data.phone;
    this.address = data.address;
    this.preferences = data.preferences || {
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
    };
    this.description = data.description;
    this.services = data.services || [];
    this.rating = data.rating || 0;
    this.totalReviews = data.totalReviews || 0;
    this.isVerified = data.isVerified || false;
    this.coordinates = data.coordinates;
    this.availability = data.availability || {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async save() {
    // Simuler l'enregistrement
    UserMemory.users.push(this);
    return this;
  }

  static users = [
    // Professionnel test 1
    {
      _id: "prof1",
      email: "garage.martin@example.com",
      password: "$2b$12$dummy", // mot de passe hashé fictif
      userType: "professionnel",
      companyName: "Garage Martin",
      profession: "automobile",
      siret: "12345678901234",
      phone: "01 23 45 67 89",
      address: "123 rue de la République, 75001 Paris",
      description: "Spécialiste en réparation automobile depuis 15 ans. Service de qualité et prix compétitifs.",
      services: ["Révision", "Réparation moteur", "Carrosserie", "Pneumatiques"],
      rating: 4.8,
      totalReviews: 156,
      isVerified: true,
      coordinates: { lat: 48.8566, lng: 2.3522 },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    // Professionnel test 2
    {
      _id: "prof2",
      email: "plomberie.dupont@example.com",
      password: "$2b$12$dummy",
      userType: "professionnel",
      companyName: "Plomberie Dupont",
      profession: "plomberie",
      siret: "98765432109876",
      phone: "01 98 76 54 32",
      address: "456 avenue des Champs, 75008 Paris",
      description: "Interventions d'urgence 24h/7j. Devis gratuit, travail soigné garanti.",
      services: ["Dépannage urgence", "Installation sanitaire", "Chauffage", "Canalisations"],
      rating: 4.6,
      totalReviews: 89,
      isVerified: true,
      coordinates: { lat: 48.8738, lng: 2.2950 },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date('2024-01-10'),
    },
    // Professionnel test 3
    {
      _id: "prof3",
      email: "serrures.leblanc@example.com",
      password: "$2b$12$dummy",
      userType: "professionnel",
      companyName: "Serrures LeBlanc",
      profession: "serrurerie",
      siret: "56789012345678",
      phone: "01 11 22 33 44",
      address: "789 boulevard Saint-Germain, 75006 Paris",
      description: "Ouverture de porte, installation et réparation de serrures. Intervention rapide.",
      services: ["Ouverture de porte", "Changement serrure", "Installation blindage", "Clés perdues"],
      rating: 4.9,
      totalReviews: 203,
      isVerified: true,
      coordinates: { lat: 48.8534, lng: 2.3488 },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      createdAt: new Date('2023-02-10'),
      updatedAt: new Date('2024-01-05'),
    }
  ];

  static async findOne(query) {
    return this.users.find(user => {
      if (query.email) return user.email === query.email;
      if (query._id) return user._id === query._id;
      return false;
    });
  }

  static async findById(id) {
    return this.users.find(user => user._id === id);
  }

  static async find(query = {}) {
    return this.users.filter(user => {
      if (query.userType) return user.userType === query.userType;
      return true;
    });
  }

  static async findByIdAndUpdate(id, updateData, options = {}) {
    const userIndex = this.users.findIndex(user => user._id === id);
    if (userIndex === -1) return null;
    
    const user = this.users[userIndex];
    Object.assign(user, updateData);
    user.updatedAt = new Date();
    
    return user;
  }
}

module.exports = UserMemory;
