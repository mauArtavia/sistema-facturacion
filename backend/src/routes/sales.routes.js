/**
 * ============================================
 * Sales Routes - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Defines all HTTP routes related to sales and connects them to the
 * corresponding controller functions.
 *
 * Architecture Flow:
 * Client Request → Route → Controller → Response
 *
 * IMPORTANT:
 * This file is responsible ONLY for routing.
 * No business logic should be implemented here.
 *
 * Future improvements:
 * - Add route validation middleware
 * - Add authentication middleware
 * - Versioning (e.g., /api/v1/sales)
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

const express = require("express");
const router = express.Router();

/**
 * Import Sales Controller
 * Handles the business logic for each endpoint
 */
const salesController = require("../controllers/sales.controller");

/**
 * ============================================
 * ROUTES DEFINITION
 * ============================================
 */

/**
 * @route   POST /sales
 * @desc    Create a new sale
 * @access  Public (for now)
 */
router.post("/", salesController.createSale);

/**
 * @route   GET /sales
 * @desc    Retrieve all sales
 * @access  Public (for now)
 */
router.get("/", salesController.getSales);

/**
 * ============================================
 * EXPORT ROUTER
 * ============================================
 * This router is mounted in index.js:
 * app.use("/sales", router)
 */
module.exports = router;