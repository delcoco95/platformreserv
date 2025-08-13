const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
require('dotenv').config();

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connexion MongoDB réussie');
  } catch (error) {
    console.error('❌ Erreur MongoDB:', error);
    process.exit(1);
  }
};

// Créer des utilisateurs de test
const createTestUsers = async () => {
  try {
    // Supprimer les données existantes
    await User.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});

    console.log('🧹 Données existantes supprimées');

    // Créer des clients de test
    const clients = [
      {
        email: 'client1@test.com',
        password: await bcrypt.hash('123456', 12),
        firstName: 'Jean',
        lastName: 'Dupont',
        userType: 'client',
        phone: '06 12 34 56 78',
        address: {
          street: '123 rue de la Paix',
          city: 'Paris',
          zipCode: '75001',
          country: 'France'
        }
      },
      {
        email: 'client2@test.com',
        password: await bcrypt.hash('123456', 12),
        firstName: 'Marie',
        lastName: 'Martin',
        userType: 'client',
        phone: '06 98 76 54 32',
        address: {
          street: '456 avenue de la République',
          city: 'Lyon',
          zipCode: '69001',
          country: 'France'
        }
      }
    ];

    const createdClients = await User.insertMany(clients);
    console.log('👥 Clients créés:', createdClients.length);

    // Créer des professionnels de test
    const professionals = [
      {
        email: 'garage.martin@test.com',
        password: await bcrypt.hash('123456', 12),
        firstName: 'Pierre',
        lastName: 'Martin',
        userType: 'professionnel',
        phone: '01 23 45 67 89',
        businessInfo: {
          companyName: 'Garage Martin',
          siret: '12345678901234',
          businessAddress: {
            street: '123 rue de la République',
            city: 'Paris',
            zipCode: '75001',
            country: 'France'
          },
          profession: 'automobile',
          description: 'Garage spécialisé dans l\'entretien et la réparation automobile. Plus de 20 ans d\'expérience dans le domaine.',
          schedule: {
            monday: { isWorking: true, start: '08:00', end: '18:00' },
            tuesday: { isWorking: true, start: '08:00', end: '18:00' },
            wednesday: { isWorking: true, start: '08:00', end: '18:00' },
            thursday: { isWorking: true, start: '08:00', end: '18:00' },
            friday: { isWorking: true, start: '08:00', end: '18:00' },
            saturday: { isWorking: true, start: '09:00', end: '17:00' },
            sunday: { isWorking: false, start: '08:00', end: '18:00' }
          }
        }
      },
      {
        email: 'plomberie.dupont@test.com',
        password: await bcrypt.hash('123456', 12),
        firstName: 'Michel',
        lastName: 'Dupont',
        userType: 'professionnel',
        phone: '01 34 56 78 90',
        businessInfo: {
          companyName: 'Plomberie Dupont',
          siret: '98765432109876',
          businessAddress: {
            street: '456 boulevard Saint-Germain',
            city: 'Paris',
            zipCode: '75006',
            country: 'France'
          },
          profession: 'plomberie',
          description: 'Plombier professionnel pour tous vos besoins en plomberie : dépannage, installation, rénovation. Intervention rapide 24h/24.',
          schedule: {
            monday: { isWorking: true, start: '07:00', end: '19:00' },
            tuesday: { isWorking: true, start: '07:00', end: '19:00' },
            wednesday: { isWorking: true, start: '07:00', end: '19:00' },
            thursday: { isWorking: true, start: '07:00', end: '19:00' },
            friday: { isWorking: true, start: '07:00', end: '19:00' },
            saturday: { isWorking: true, start: '08:00', end: '16:00' },
            sunday: { isWorking: false, start: '07:00', end: '19:00' }
          }
        }
      },
      {
        email: 'serrurier.bernard@test.com',
        password: await bcrypt.hash('123456', 12),
        firstName: 'Bernard',
        lastName: 'Lefèvre',
        userType: 'professionnel',
        phone: '01 45 67 89 01',
        businessInfo: {
          companyName: 'Serrurerie Lefèvre',
          siret: '11223344556677',
          businessAddress: {
            street: '789 rue de Rivoli',
            city: 'Paris',
            zipCode: '75004',
            country: 'France'
          },
          profession: 'serrurerie',
          description: 'Serrurier professionnel pour ouverture de porte, installation et dépannage serrurerie. Service d\'urgence disponible.',
          schedule: {
            monday: { isWorking: true, start: '08:00', end: '20:00' },
            tuesday: { isWorking: true, start: '08:00', end: '20:00' },
            wednesday: { isWorking: true, start: '08:00', end: '20:00' },
            thursday: { isWorking: true, start: '08:00', end: '20:00' },
            friday: { isWorking: true, start: '08:00', end: '20:00' },
            saturday: { isWorking: true, start: '09:00', end: '18:00' },
            sunday: { isWorking: true, start: '10:00', end: '16:00' }
          }
        }
      },
      {
        email: 'electricite.blanc@test.com',
        password: await bcrypt.hash('123456', 12),
        firstName: 'Thomas',
        lastName: 'Blanc',
        userType: 'professionnel',
        phone: '01 56 78 90 12',
        businessInfo: {
          companyName: 'Électricité Blanc',
          siret: '99887766554433',
          businessAddress: {
            street: '321 avenue des Champs-Élysées',
            city: 'Paris',
            zipCode: '75008',
            country: 'France'
          },
          profession: 'electricite',
          description: 'Électricien qualifié pour installation électrique, dépannage et mise aux normes. Intervention rapide et travaux garantis.',
          schedule: {
            monday: { isWorking: true, start: '08:00', end: '18:00' },
            tuesday: { isWorking: true, start: '08:00', end: '18:00' },
            wednesday: { isWorking: true, start: '08:00', end: '18:00' },
            thursday: { isWorking: true, start: '08:00', end: '18:00' },
            friday: { isWorking: true, start: '08:00', end: '18:00' },
            saturday: { isWorking: false, start: '08:00', end: '18:00' },
            sunday: { isWorking: false, start: '08:00', end: '18:00' }
          }
        }
      }
    ];

    const createdProfessionals = await User.insertMany(professionals);
    console.log('🔧 Professionnels créés:', createdProfessionals.length);

    // Créer des services de test
    const services = [
      // Services Garage Martin
      {
        professionalId: createdProfessionals[0]._id,
        name: 'Vidange complète',
        description: 'Vidange moteur + remplacement filtre à huile et filtre à air + contrôle technique',
        category: 'automobile',
        price: 89,
        duration: 60,
        isActive: true
      },
      {
        professionalId: createdProfessionals[0]._id,
        name: 'Diagnostic électronique',
        description: 'Diagnostic complet du véhicule avec lecture des codes défaut',
        category: 'automobile',
        price: 45,
        duration: 30,
        isActive: true
      },
      {
        professionalId: createdProfessionals[0]._id,
        name: 'Changement de pneus',
        description: 'Montage et équilibrage de pneus neufs ou d\'occasion',
        category: 'automobile',
        price: 120,
        duration: 90,
        isActive: true
      },

      // Services Plomberie Dupont
      {
        professionalId: createdProfessionals[1]._id,
        name: 'Dépannage fuite',
        description: 'Réparation rapide de fuites d\'eau, robinetterie et canalisation',
        category: 'plomberie',
        price: 75,
        duration: 45,
        isActive: true
      },
      {
        professionalId: createdProfessionals[1]._id,
        name: 'Installation chauffe-eau',
        description: 'Installation complète de chauffe-eau électrique ou gaz',
        category: 'plomberie',
        price: 350,
        duration: 180,
        isActive: true
      },

      // Services Serrurerie Lefèvre
      {
        professionalId: createdProfessionals[2]._id,
        name: 'Ouverture de porte',
        description: 'Ouverture de porte claquée ou fermée à clé sans destruction',
        category: 'serrurerie',
        price: 65,
        duration: 30,
        isActive: true
      },
      {
        professionalId: createdProfessionals[2]._id,
        name: 'Changement de serrure',
        description: 'Remplacement complet de serrure avec nouvelles clés',
        category: 'serrurerie',
        price: 150,
        duration: 60,
        isActive: true
      },

      // Services Électricité Blanc
      {
        professionalId: createdProfessionals[3]._id,
        name: 'Dépannage électrique',
        description: 'Intervention pour panne électrique, disjoncteur, prises défaillantes',
        category: 'electricite',
        price: 80,
        duration: 60,
        isActive: true
      },
      {
        professionalId: createdProfessionals[3]._id,
        name: 'Installation luminaire',
        description: 'Installation de luminaires, interrupteurs et prises électriques',
        category: 'electricite',
        price: 95,
        duration: 90,
        isActive: true
      }
    ];

    const createdServices = await Service.insertMany(services);
    console.log('⚙️ Services créés:', createdServices.length);

    // Créer quelques réservations de test
    const bookings = [
      {
        clientId: createdClients[0]._id,
        professionalId: createdProfessionals[0]._id,
        serviceId: createdServices[0]._id,
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Dans 2 jours
        status: 'confirmed',
        totalPrice: 89,
        clientMessage: 'Véhicule Renault Clio 2018, besoin d\'une vidange complète'
      },
      {
        clientId: createdClients[1]._id,
        professionalId: createdProfessionals[1]._id,
        serviceId: createdServices[3]._id,
        appointmentDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Demain
        status: 'pending',
        totalPrice: 75,
        clientMessage: 'Fuite sous l\'évier de cuisine à réparer'
      }
    ];

    const createdBookings = await Booking.insertMany(bookings);
    console.log('📅 Réservations créées:', createdBookings.length);

    console.log('\n✅ Initialisation des données terminée !');
    console.log('\n📧 Comptes de test créés :');
    console.log('Clients :');
    console.log('  - client1@test.com / 123456');
    console.log('  - client2@test.com / 123456');
    console.log('Professionnels :');
    console.log('  - garage.martin@test.com / 123456 (Automobile)');
    console.log('  - plomberie.dupont@test.com / 123456 (Plomberie)');
    console.log('  - serrurier.bernard@test.com / 123456 (Serrurerie)');
    console.log('  - electricite.blanc@test.com / 123456 (Électricité)');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
};

// Exécuter le script
const init = async () => {
  await connectDB();
  await createTestUsers();
  await mongoose.connection.close();
  console.log('🔌 Connexion fermée');
  process.exit(0);
};

init();
