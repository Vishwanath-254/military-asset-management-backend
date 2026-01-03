const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// REGISTER (for testing)
router.post("/register", async (req, res) => {
  const { name, email, password, role, base_id } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users (name,email,password,role,base_id) VALUES (?,?,?,?,?)";

  db.query(sql, [name, email, hashed, role, base_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User registered" });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err || result.length === 0)
        return res.status(401).json({ message: "Invalid email" });

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign(
        { id: user.id, role: user.role, base_id: user.base_id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token, role: user.role });
    }
  );
});

module.exports = router;
