const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const db = require("../config/db");
const auditLog = require("../utils/auditLogger");

// CREATE TRANSFER
router.post("/", auth, role("ADMIN", "LOGISTICS"), (req, res) => {
  const { asset_id, from_base, to_base, quantity } = req.body;

  if (from_base === to_base) {
    return res.status(400).json({ message: "Bases cannot be same" });
  }

  const sql =
    "INSERT INTO transfers (asset_id, from_base, to_base, quantity) VALUES (?,?,?,?)";

  db.query(sql, [asset_id, from_base, to_base, quantity], (err) => {
    if (err) return res.status(500).json(err);
    auditLog(
     req.user.id,
    `Transferred asset ${asset_id} qty ${quantity} from base ${from_base} to base ${to_base}`
);

  });
});

// GET TRANSFER HISTORY
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM transfers ORDER BY date DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
