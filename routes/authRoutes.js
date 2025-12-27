const express = require("express");
const router = express.Router();
const users = require("../users");



// EMAIL VALIDATION FUNCTION
function isValidEmail(email) {
  return email.includes("@");
}

// 🔹 REGISTER API
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  // Check if email exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Save user
  users.push({ email, password });

  res.json({ message: "User registered successfully" });
});

// 🔹 LOGIN API
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    user => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

module.exports = router;
