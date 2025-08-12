const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Configuration
dotenv.config();

const app = express();

// Sécurité et middleware
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS - Configuration pour le développement
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    process.env.FRONTEND_URL || "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite à 100 requêtes par fenêtre
  message: {
    error: "Trop de requêtes, réessayez dans 15 minutes"
  }
});
app.use("/api/", limiter);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connexion MongoDB réussie"))
.catch(err => console.error("❌ Erreur MongoDB:", err));

// Routes API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/conversations", require("./routes/conversationRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

// Routes de santé
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "🚀 API RendezVousPro",
    version: "2.0.0",
    status: "active"
  });
});

// Gestion des erreurs 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} non trouvée`
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur:", err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur serveur interne";
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
