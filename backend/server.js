const app = require("./src/app");

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json({
    message: "Military Asset Management Backend is running (Render)"
  });
});
