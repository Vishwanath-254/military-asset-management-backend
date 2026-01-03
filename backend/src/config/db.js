const mysql = require("mysql2");

let connection = null;

if (process.env.NODE_ENV !== "production") {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect((err) => {
    if (err) {
      console.error("❌ MySQL connection failed:", err);
    } else {
      console.log("✅ MySQL connected");
    }
  });
} else {
  console.log("⚠️ Production mode: running without MySQL (Render demo)");
}

module.exports = connection;
