const db = require("../config/db");

const auditLog = (userId, action) => {
  const sql = "INSERT INTO audit_logs (user_id, action) VALUES (?, ?)";

  db.query(sql, [userId, action], (err) => {
    if (err) {
      console.error("❌ Audit log failed:", err);
    }
  });
};

module.exports = auditLog;
