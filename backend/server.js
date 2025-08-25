const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: '🚗 API BookAuto',
    version: '1.0.0',
    status: 'active'
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} non trouvée`
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur serveur interne';
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// MongoDB connection with retry logic (non-blocking)
async function connectWithRetry() {
  const { MONGO_URI } = process.env;

  let attempts = 0;
  const maxAttempts = 5; // Limite les tentatives pour éviter les boucles infinies

  while (attempts < maxAttempts) {
    try {
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ MongoDB connecté');
      break;
    } catch (err) {
      attempts++;
      console.error(`❌ Connexion MongoDB échouée (tentative ${attempts}/${maxAttempts}):`, err.message);

      if (attempts < maxAttempts) {
        console.log('⏳ Nouvelle tentative dans 2s...');
        await new Promise(res => setTimeout(res, 2000));
      } else {
        console.log('⚠️ MongoDB indisponible - Le serveur continuera sans base de données');
      }
    }
  }
}

// Start server immediately and connect to MongoDB in background
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);

  // Try to connect to MongoDB in background
  connectWithRetry().catch(err => {
    console.error('❌ Erreur lors de la connexion MongoDB:', err.message);
  });
});

module.exports = app;
