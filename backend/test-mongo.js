const mongoose = require("mongoose");
require("dotenv").config();

const testMongoDB = async () => {
  try {
    console.log("🔄 Test de connexion MongoDB...");
    console.log("URI:", process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    
    // Test simple de création
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model("Test", testSchema);
    
    const testDoc = new TestModel({ name: "Test Connection" });
    await testDoc.save();
    console.log("✅ Document test créé:", testDoc._id);
    
    // Nettoyer
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log("✅ Document test supprimé");
    
    await mongoose.connection.close();
    console.log("✅ Connexion fermée");
    
  } catch (error) {
    console.error("❌ Erreur MongoDB:", error.message);
    process.exit(1);
  }
};

testMongoDB();
