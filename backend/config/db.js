const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ Erreur de connexion à la base de données:", err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
