const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware de base
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    message: 'Backend temporaire en cours d\'exécution'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: '🚗 API BookAuto (Mode Développement)',
    version: '1.0.0',
    status: 'active - mode temporaire'
  });
});

// Routes temporaires d'authentification
app.post('/api/auth/register', (req, res) => {
  res.json({
    success: true,
    message: 'Inscription réussie (mode temporaire)',
    token: 'temp-token-' + Date.now(),
    user: {
      id: 'temp-user-' + Date.now(),
      firstName: req.body.firstName || 'Utilisateur',
      lastName: req.body.lastName || 'Test',
      email: req.body.email || 'test@example.com',
      userType: req.body.userType || 'client'
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Connexion réussie (mode temporaire)',
    token: 'temp-token-' + Date.now(),
    user: {
      id: 'temp-user-' + Date.now(),
      firstName: 'Utilisateur',
      lastName: 'Test',
      email: req.body.email || 'test@example.com',
      userType: 'client'
    }
  });
});

// Routes temporaires pour les utilisateurs
app.get('/api/users/professionals', (req, res) => {
  res.json({
    success: true,
    professionals: [
      {
        _id: 'prof1',
        firstName: 'Pierre',
        lastName: 'Martin',
        email: 'pierre@garage.com',
        phone: '01 23 45 67 89',
        businessInfo: {
          companyName: 'Garage Martin',
          profession: 'automobile',
          description: 'Garage spécialisé dans l\'entretien automobile'
        }
      }
    ]
  });
});

// Routes temporaires pour les services
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    services: []
  });
});

app.get('/api/services/my-services', (req, res) => {
  res.json({
    success: true,
    services: []
  });
});

// Routes temporaires pour les réservations
app.get('/api/bookings/my-bookings', (req, res) => {
  res.json({
    success: true,
    bookings: []
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} non trouvée (mode développement)`
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  
  res.status(500).json({
    success: false,
    message: 'Erreur serveur (mode développement)',
    error: err.message
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur de développement démarré sur http://localhost:${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log('⚠️  Mode temporaire - MongoDB non requis');
});

module.exports = app;
