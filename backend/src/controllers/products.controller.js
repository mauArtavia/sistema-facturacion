/**
 * ============================================
 * Products Controller - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Handles product creation and listing for POS system.
 * Data is stored in memory (temporary), will reset on server restart.
 * Now uses sharedData from sales.controller.js for consistency.
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

// Import sharedData from sales.controller.js
const { sharedData } = require("./sales.controller");

/**
 * Create a new product
 * POST /products
 * Body: { name: string, price: number }
 */
const createProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
    createdAt: new Date()
  };

  sharedData.products.push(newProduct);
  console.log("Product created:", newProduct);

  res.status(201).json(newProduct);
};

/**
 * Get all products
 * GET /products
 */
const getProducts = (req, res) => {
  res.json(sharedData.products);
};

module.exports = {
  createProduct,
  getProducts
};