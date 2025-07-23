const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

const connectDB = async () => {
  try {
    // En production, utiliser la vraie base MongoDB
    if (process.env.NODE_ENV === 'production') {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
      return;
    }

    // En développement, utiliser MongoDB Memory Server
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Memory Server connecté: ${conn.connection.host}`);
    console.log("ℹ️ Base de données temporaire - les données seront perdues au redémarrage");
  } catch (err) {
    console.error("❌ Erreur de connexion à la base de données:", err.message);
    process.exit(1);
  }
};

// Fonction pour fermer proprement la connection
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.error("Erreur lors de la fermeture de la DB:", err);
  }
};

module.exports = { connectDB, closeDB };
