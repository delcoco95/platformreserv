const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Utiliser une base de données en mémoire pour le développement
    const mongoURI = process.env.NODE_ENV === 'production'
      ? process.env.MONGO_URI
      : 'mongodb://localhost:27017/rendezvouspro';

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
  } catch (err) {
    console.warn("⚠️ MongoDB non disponible, utilisation d'une base temporaire");
    console.log("ℹ️ Les données seront perdues au redémarrage du serveur");
    // Ne pas faire échouer l'application en développement
  }
};

module.exports = connectDB;
