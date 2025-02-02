const express = require("express");
const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);
router.get("/me", isAuthenticated, getCurrentUser); // Protected route

module.exports = router;
