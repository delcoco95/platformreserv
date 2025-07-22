const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { register, login, me } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Déconnexion réussie" });
});
router.get("/me", auth, me);

module.exports = router;
