const app = require("./src/app");

const PORT = process.env.PORT || 5000;

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "Military Asset Management Backend is running (Render)"
  });
});

// 🚀 START SERVER (THIS WAS MISSING)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
