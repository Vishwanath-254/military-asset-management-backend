const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/", auth, (req, res) => {
  res.json({
    openingBalance: 1000,
    purchases: 300,
    transferIn: 150,
    transferOut: 100,
    closingBalance: 1350,
    assigned: 400,
    expended: 120
  });
});

module.exports = router;
