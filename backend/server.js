const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// 🛡️ Configuration CORS sécurisée
const allowedOrigins = [
  'https://platformreserv.vercel.app/', // remplace par ton vrai domaine Vercel
  'http://localhost:5173'            // utile pour le développement local
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Accès refusé par CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// 🚀 Routes de ton API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/professionals", require("./routes/professionalRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

// 🩺 Route de santé (facultative mais utile pour test frontend ↔ backend)
app.get("/health", (req, res) => {
  res.send("✅ Backend Render fonctionne !");
});

app.get("/", (req, res) => {
  res.send("🚀 API RendezVousPro en ligne");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
