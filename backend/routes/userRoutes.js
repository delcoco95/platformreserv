const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth'); // 👈 middleware d'authentification

// Route pour récupérer le profil de l'utilisateur connecté
router.get('/me', auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
