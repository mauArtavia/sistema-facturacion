/**
 * ============================================
 * Main Server Entry Point - Backend Application
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Initializes the Express server, configures middleware,
 * and registers all API routes.
 *
 * Architecture:
 * - Routes are separated by domain (sales, products)
 * - Controllers handle business logic
 * - Prisma handles database operations
 *
 * Features:
 * - CORS configured for local development
 * - JSON request parsing
 * - Request logging middleware
 * - Health check endpoint
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

const express = require("express");
const cors = require("cors");

// Import routes
const salesRoutes = require("./routes/sales.routes");
const productsRoutes = require("./routes/products.routes");
const reportsRoutes = require("./routes/reports.routes");
const categoryRoutes = require("./routes/categories.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();
const PORT = 3000;

/**
 * ============================================
 * Global Middleware
 * ============================================
 */

/**
 * Request Logger Middleware
 * Logs every incoming request (method + endpoint)
 */
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

/**
 * CORS Configuration
 * Allows requests from localhost environments
 */
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

/**
 * Parse JSON bodies
 */
app.use(express.json());

/**
 * Handle preflight requests
 */
app.options("*", cors());

/**
 * ============================================
 * Routes
 * ============================================
 */

/**
 * Health Check
 * GET /ping
 */
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

/**
 * Sales Routes
 * Base path: /sales
 */
app.use("/sales", salesRoutes);

/**
 * Products Routes
 * Base path: /products
 */
app.use("/products", productsRoutes);

app.use("/reports", reportsRoutes);

app.use("/categories", categoryRoutes);

app.use("/", ordersRoutes);

/**
 * ============================================
 * Server Initialization
 * ============================================
 */

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on http://127.0.0.1:${PORT}`);
});
