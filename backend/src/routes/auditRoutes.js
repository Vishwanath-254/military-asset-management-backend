const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const db = require("../config/db");

/**
 * VIEW AUDIT LOGS
 * Role: ADMIN only
 */
router.get("/", auth, role("ADMIN"), (req, res) => {
  const sql = `
    SELECT audit_logs.id, audit_logs.action, audit_logs.timestamp, users.email
    FROM audit_logs
    LEFT JOIN users ON audit_logs.user_id = users.id
    ORDER BY audit_logs.timestamp DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
