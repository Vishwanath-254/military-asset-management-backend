const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const db = require("../config/db");
const auditLog = require("../utils/auditLogger");

/**
 * ASSIGN ASSET
 * Roles: ADMIN, COMMANDER
 */
router.post("/", auth, role("ADMIN", "COMMANDER"), (req, res) => {
  const { asset_id, base_id, assigned_to, quantity } = req.body;

  const sql = `
    INSERT INTO assignments (asset_id, base_id, assigned_to, quantity)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [asset_id, base_id, assigned_to, quantity], (err) => {
    if (err) return res.status(500).json(err);

    // 🔐 AUDIT LOG
    auditLog(
      req.user.id,
      `Assigned asset ${asset_id} qty ${quantity} to ${assigned_to} at base ${base_id}`
    );

    res.json({
      message: "Asset assigned successfully"
    });
  });
});

/**
 * MARK AS EXPENDED
 * Roles: ADMIN, COMMANDER
 */
router.put("/expend/:id", auth, role("ADMIN", "COMMANDER"), (req, res) => {
  const assignmentId = req.params.id;

  const sql = `
    UPDATE assignments
    SET expended = true
    WHERE id = ?
  `;

  db.query(sql, [assignmentId], (err, result) => {
    if (err) return res.status(500).json(err);

    // 🔐 AUDIT LOG
    auditLog(
      req.user.id,
      `Marked assignment ${assignmentId} as expended`
    );

    res.json({
      message: "Asset marked as expended"
    });
  });
});

/**
 * VIEW ASSIGNMENTS
 * All authenticated users
 */
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM assignments ORDER BY date DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

module.exports = router;
