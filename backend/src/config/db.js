const mysql = require("mysql2");

// 🔍 DEBUG: print env values ONCE
console.log("🔍 DB_HOST =", process.env.DB_HOST);
console.log("🔍 DB_USER =", process.env.DB_USER);
console.log("🔍 DB_NAME =", process.env.DB_NAME);

if (!process.env.DB_HOST) {
  console.error("❌ DB_HOST is undefined. Check Render Environment Variables.");
  process.exit(1);
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL Connected");
});

module.exports = connection;
