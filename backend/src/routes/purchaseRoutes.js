const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const db = require("../config/db");
const auditLog = require("../utils/auditLogger");

// ADD PURCHASE
router.post("/", auth, role("ADMIN", "LOGISTICS"), (req, res) => {
  const { asset_id, base_id, quantity } = req.body;

  const sql =
    "INSERT INTO purchases (asset_id, base_id, quantity) VALUES (?,?,?)";

  db.query(sql, [asset_id, base_id, quantity], (err) => {
    if (err) return res.status(500).json(err);
    auditLog(req.user.id, `Purchased asset ${asset_id} qty ${quantity} at base ${base_id}`);
    res.json({ message: "Purchase recorded" });

  });
});

// VIEW PURCHASES
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM purchases", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
