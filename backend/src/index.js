const express = require("express");
const cors = require("cors");

// Import routes
const salesRoutes = require("./routes/sales.routes");
const productsRoutes = require("./routes/products.routes");

const app = express();
const PORT = 3000;

/**
 * ============================================
 * Global Middleware
 * ============================================
 */

// Request Logger
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Enable CORS: permitir cualquier puerto en localhost o 127.0.0.1
app.use(cors({
  origin: function(origin, callback) {
    // permitir requests sin origin (Postman, curl, etc.)
    if (!origin) return callback(null, true);

    // permitir localhost y 127.0.0.1 con cualquier puerto
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    // bloquear otros orígenes
    const msg = `CORS no permite este origen: ${origin}`;
    return callback(new Error(msg), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// JSON Parser
app.use(express.json());

// Handle preflight requests
app.options("*", cors());

/**
 * ============================================
 * Routes
 * ============================================
 */

// Health Check
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Sales routes
app.use("/sales", salesRoutes);

// Products routes
app.use("/products", productsRoutes);

/**
 * ============================================
 * Server Initialization
 * ============================================
 */

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});