// Utiliser le modèle en mémoire pour le développement
const User = require("../models/UserMemory");

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user && user.password) {
      delete user.password; // Exclure le password
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    // Transformer les données pour correspondre aux interfaces frontend
    const userData = {
      uid: user._id,
      email: user.email,
      userType: user.userType,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
      phone: user.phone,
      address: user.address,
    };

    if (user.userType === "client") {
      userData.firstName = user.firstName;
      userData.lastName = user.lastName;
      userData.preferences = user.preferences;
    } else if (user.userType === "professionnel") {
      userData.companyName = user.companyName;
      userData.profession = user.profession;
      userData.siret = user.siret;
      userData.description = user.description;
      userData.services = user.services;
      userData.rating = user.rating;
      userData.totalReviews = user.totalReviews;
      userData.isVerified = user.isVerified;
      userData.coordinates = user.coordinates;
      userData.availability = user.availability;
    }

    res.json({
      success: true,
      data: userData,
    });
  } catch (err) {
    console.error("Erreur getUserById:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Vérifier que l'utilisateur modifie son propre profil
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Non autorisé à modifier ce profil",
      });
    }

    // Supprimer les champs sensibles
    delete updateData.password;
    delete updateData._id;
    delete updateData.uid;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    // Transformer les données comme dans getUserById
    const userData = {
      uid: user._id,
      email: user.email,
      userType: user.userType,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
      phone: user.phone,
      address: user.address,
    };

    if (user.userType === "client") {
      userData.firstName = user.firstName;
      userData.lastName = user.lastName;
      userData.preferences = user.preferences;
    } else if (user.userType === "professionnel") {
      userData.companyName = user.companyName;
      userData.profession = user.profession;
      userData.siret = user.siret;
      userData.description = user.description;
      userData.services = user.services;
      userData.rating = user.rating;
      userData.totalReviews = user.totalReviews;
      userData.isVerified = user.isVerified;
      userData.coordinates = user.coordinates;
      userData.availability = user.availability;
    }

    res.json({
      success: true,
      data: userData,
    });
  } catch (err) {
    console.error("Erreur updateUser:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour",
    });
  }
};

exports.getAllProfessionals = async (req, res) => {
  try {
    // Obtenir tous les professionnels sans .select() et .sort() pour le modèle en mémoire
    const allUsers = User.users || [];
    const professionals = allUsers
      .filter(user => user.userType === "professionnel")
      .map(prof => {
        // Exclure le password
        const { password, ...profWithoutPassword } = prof;
        return profWithoutPassword;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const transformedProfessionals = professionals.map((prof) => ({
      uid: prof._id,
      email: prof.email,
      userType: prof.userType,
      createdAt: prof.createdAt?.toISOString(),
      updatedAt: prof.updatedAt?.toISOString(),
      phone: prof.phone,
      address: prof.address,
      companyName: prof.companyName,
      profession: prof.profession,
      siret: prof.siret,
      description: prof.description,
      services: prof.services,
      rating: prof.rating,
      totalReviews: prof.totalReviews,
      isVerified: prof.isVerified,
      coordinates: prof.coordinates,
      availability: prof.availability,
    }));

    res.json({
      success: true,
      data: transformedProfessionals,
    });
  } catch (err) {
    console.error("Erreur getAllProfessionals:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

exports.searchProfessionals = async (req, res) => {
  try {
    const { q, profession, location } = req.query;

    // Obtenir tous les professionnels
    const allUsers = User.users || [];
    let professionals = allUsers.filter(user => user.userType === "professionnel");

    // Filtre par profession
    if (profession && profession !== "all") {
      professionals = professionals.filter(prof => prof.profession === profession);
    }

    // Recherche textuelle
    if (q) {
      const searchQuery = q.toLowerCase();
      professionals = professionals.filter(prof =>
        (prof.companyName && prof.companyName.toLowerCase().includes(searchQuery)) ||
        (prof.description && prof.description.toLowerCase().includes(searchQuery)) ||
        (prof.services && prof.services.some(service => service.toLowerCase().includes(searchQuery))) ||
        (prof.address && prof.address.toLowerCase().includes(searchQuery))
      );
    }

    // Filtre par localisation
    if (location) {
      const locationQuery = location.toLowerCase();
      professionals = professionals.filter(prof =>
        prof.address && prof.address.toLowerCase().includes(locationQuery)
      );
    }

    // Exclure le password et trier
    professionals = professionals
      .map(prof => {
        const { password, ...profWithoutPassword } = prof;
        return profWithoutPassword;
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));

    const transformedProfessionals = professionals.map((prof) => ({
      uid: prof._id,
      email: prof.email,
      userType: prof.userType,
      createdAt: prof.createdAt?.toISOString(),
      updatedAt: prof.updatedAt?.toISOString(),
      phone: prof.phone,
      address: prof.address,
      companyName: prof.companyName,
      profession: prof.profession,
      siret: prof.siret,
      description: prof.description,
      services: prof.services,
      rating: prof.rating,
      totalReviews: prof.totalReviews,
      isVerified: prof.isVerified,
      coordinates: prof.coordinates,
      availability: prof.availability,
    }));

    res.json({
      success: true,
      data: transformedProfessionals,
    });
  } catch (err) {
    console.error("Erreur searchProfessionals:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};
