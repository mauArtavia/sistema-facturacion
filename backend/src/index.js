/**
 * ============================================
 * Main Server Entry Point - Backend Application
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * This is the main entry point of the backend server.
 * It initializes the Express application, configures middleware, and registers all API routes.
 *
 * Features:
 * - REST API for sales management
 * - JSON request handling
 * - CORS enabled for frontend integration
 * - Basic request logging middleware
 *
 * NOTE:
 * This server currently uses in-memory data storage.
 * All data will reset when the server restarts.
 *
 * Future improvements:
 * - Environment configuration (dotenv)
 * - Database connection (MongoDB / PostgreSQL)
 * - Centralized error handling
 * - Authentication & authorization (JWT)
 * - Logging system (Winston / Morgan)
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

const express = require("express");
const cors = require("cors");

// Import routes
const salesRoutes = require("./routes/sales.routes");

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
  console.log(`➡️ Incoming Request: ${req.method} ${req.url}`);
  next();
});

/**
 * Enable CORS
 * Allows frontend apps to communicate with this API
 */
app.use(cors());

/**
 * JSON Parser Middleware
 * Parses incoming JSON requests into req.body
 */
app.use(express.json());

/**
 * ============================================
 * Routes
 * ============================================
 */

/**
 * Health Check Route
 * Used to verify that the server is running
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
 * ============================================
 * Server Initialization
 * ============================================
 */

/**
 * Starts the server and listens on defined port
 */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on http://127.0.0.1:${PORT}`);
});