const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getUserById,
  updateUser,
  getAllProfessionals,
  searchProfessionals,
} = require("../controllers/userController");

// Routes utilisateurs
router.get("/me", auth, (req, res) => {
  res.json(req.user);
});
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);

module.exports = router;
