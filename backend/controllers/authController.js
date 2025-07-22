const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
<<<<<<< HEAD
    const {
      email,
      password,
      userType,
      // Champs client
      firstName,
      lastName,
      phone,
      address,
      // Champs professionnel
      companyName,
      profession,
      siret,
    } = req.body;
=======
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Champs requis manquants (role, email ou password)"
      });
    }
>>>>>>> e92b838680099adeeb2f2a262baad75269ed2085

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
<<<<<<< HEAD
        message: "Cette adresse email est déjà utilisée",
=======
        error: "Email déjà utilisé."
>>>>>>> e92b838680099adeeb2f2a262baad75269ed2085
      });
    }

    // Validation des champs obligatoires selon le type d'utilisateur
    if (userType === "client") {
      if (!firstName || !lastName) {
        return res.status(400).json({
          success: false,
          message: "Le prénom et nom sont obligatoires pour les clients",
        });
      }
    } else if (userType === "professionnel") {
      if (!companyName || !profession) {
        return res.status(400).json({
          success: false,
          message:
            "Le nom d'entreprise et la profession sont obligatoires pour les professionnels",
        });
      }
    }

<<<<<<< HEAD
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur avec les bons champs selon le type
    const userData = {
      email,
      password: hashedPassword,
      userType,
      phone,
      address,
    };
=======
    const newUser = new User({
      role,
      email,
      password: hashedPassword,
      nom: req.body.nom || "",
      telephone: req.body.telephone || "",
      adresse: req.body.adresse || "",
      siret: req.body.siret || "",
      metier: req.body.metier || ""
    });
>>>>>>> e92b838680099adeeb2f2a262baad75269ed2085

    if (userType === "client") {
      userData.firstName = firstName;
      userData.lastName = lastName;
    } else if (userType === "professionnel") {
      userData.companyName = companyName;
      userData.profession = profession;
      userData.siret = siret;
    }

    const newUser = new User(userData);
    await newUser.save();

<<<<<<< HEAD
    // Générer le token JWT
    const token = jwt.sign(
      { id: newUser._id, userType: newUser.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Retourner l'utilisateur et le token
    const userResponse = {
      uid: newUser._id,
      email: newUser.email,
      userType: newUser.userType,
    };

    res.status(201).json({
      success: true,
      data: { user: userResponse, token },
    });
  } catch (err) {
    console.error("Erreur register:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'inscription",
=======
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          uid: newUser._id,
          email: newUser.email,
          role: newUser.role,
        }
      }
    });
  } catch (err) {
    console.error("Erreur d'inscription :", err);
    return res.status(500).json({
      success: false,
      error: "Erreur serveur"
>>>>>>> e92b838680099adeeb2f2a262baad75269ed2085
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
<<<<<<< HEAD
        message: "Aucun compte trouvé avec cette adresse email",
=======
        error: "Utilisateur introuvable."
>>>>>>> e92b838680099adeeb2f2a262baad75269ed2085
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
<<<<<<< HEAD
        message: "Mot de passe incorrect",
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Retourner l'utilisateur et le token
    const userResponse = {
      uid: user._id,
      email: user.email,
      userType: user.userType,
    };

    res.status(200).json({
      success: true,
      data: { user: userResponse, token },
    });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la connexion",
    });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    const userResponse = {
      uid: user._id,
      email: user.email,
      userType: user.userType,
    };

    res.json({
      success: true,
      data: userResponse,
    });
  } catch (err) {
    console.error("Erreur me:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
=======
        error: "Mot de passe incorrect."
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          uid: user._id,
          email: user.email,
          role: user.role,
        }
      }
    });
  } catch (err) {
    console.error("Erreur login :", err);
    return res.status(500).json({
      success: false,
      error: "Erreur serveur"
>>>>>>> e92b838680099adeeb2f2a262baad75269ed2085
    });
  }
};
