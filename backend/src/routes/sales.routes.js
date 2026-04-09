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

/**
 * Import Sales Controller
 * Handles the business logic for each endpoint
 */
const salesController = require("../controllers/sales.controller");

/**
 * ============================================
 * SALES ROUTES
 * ============================================
 */

/**
 * @route   GET /sales
 * @desc    Retrieve all sales
 * @access  Public
 */
router.get("/", salesController.getSales);

/**
 * @route   POST /sales
 * @desc    Create a new sale
 * @access  Public
 * @body    { amount: number, method: string, productId?: number }
 */
router.post("/", salesController.createSale);

/**
 * ============================================
 * PRODUCT ROUTES
 * ============================================
 */

/**
 * @route   GET /sales/products
 * @desc    List all products
 * @access  Public
 */
router.get("/products", salesController.getProducts);

/**
 * @route   POST /sales/products
 * @desc    Create a new product
 * @access  Public
 * @body    { name: string, price: number }
 */
router.post("/products", salesController.createProduct);

/**
 * ============================================
 * EXPORT ROUTER
 * ============================================
 * This router is mounted in index.js:
 * app.use("/sales", router)
 */
module.exports = router;