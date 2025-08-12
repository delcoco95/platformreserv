const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔗 Test de connexion MongoDB...');
console.log('URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connexion MongoDB réussie !');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  });
