const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    console.log("✅ Connexion à MongoDB réussie");
  } catch (err) {
    console.error(
      "⚠️ MongoDB non disponible, fonctionnement en mode development :",
      err.message,
    );
    // Ne pas faire échouer le serveur si MongoDB n'est pas disponible
    // En mode développement, on peut continuer sans base de données
  }
};

module.exports = connectDB;
