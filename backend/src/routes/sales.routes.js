/**
 * ============================================
 * Sales Routes - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Defines all HTTP routes related to sales and products,
 * connecting them to the corresponding controller functions.
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

// Controllers
const salesController = require("../controllers/sales.controller");
const productsController = require("../controllers/products.controller");

/**
 * ============================================
 * SALES ROUTES
 * ============================================
 */
router.get("/", salesController.getSales);
router.post("/", salesController.createSale);

module.exports = router;