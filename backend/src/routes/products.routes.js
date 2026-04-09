/**
 * ============================================
 * Products Routes - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Defines HTTP routes for product management.
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/products.controller");

// Create product
router.post("/", controller.createProduct);

// List products
router.get("/", controller.getProducts);

module.exports = router;