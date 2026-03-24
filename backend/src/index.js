const express = require("express");
const cors = require("cors");

const salesRoutes = require("./routes/sales.routes");

const app = express();
const PORT = 3000;

// 🔥 LOG GLOBAL (ver si entra cualquier request)
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

// 🔥 TEST DIRECTO
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.use("/sales", salesRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on http://127.0.0.1:${PORT}`);
});