const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Champs requis manquants (role, email ou password)"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email déjà utilisé."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    await newUser.save();

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
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Utilisateur introuvable."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
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
    });
  }
};
