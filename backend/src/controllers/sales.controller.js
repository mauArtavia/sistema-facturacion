/**
 * ============================================
 * Sales & Products Controller - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Handles all operations for sales and products including creation,
 * listing, and linking sales to products.
 *
 * NOTE:
 * This implementation uses in-memory storage.
 * Data will be lost on server restart.
 *
 * Future improvements:
 * - Database integration
 * - Validation middleware
 * - Authentication & authorization
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

// Shared in-memory storage for both controllers
const sharedData = {
  sales: [],
  products: []
};

/**
 * ============================================
 * PRODUCT OPERATIONS
 * ============================================
 */

/**
 * Create a new product
 * POST /sales/products
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
    price,
    createdAt: new Date()
  };

  sharedData.products.push(newProduct);

  console.log("Product created:", newProduct);

  res.status(201).json(newProduct);
};

/**
 * Get all products
 * GET /sales/products
 */
const getProducts = (req, res) => {
  res.json(sharedData.products);
};

/**
 * ============================================
 * SALES OPERATIONS
 * ============================================
 */

/**
 * Create a new sale
 * POST /sales
 * Body: { amount: number, method: string, productId?: number }
 */
const createSale = (req, res) => {
  const { amount, method, productId } = req.body;

  if (!amount || !method) {
    return res.status(400).json({ message: "Amount and method are required" });
  }

  // Attach product info if productId is provided
  let productInfo = null;

  // Validar correctamente productId (evitar null, "", NaN)
  const pid = Number(productId);

  if (!isNaN(pid) && pid > 0) {
    productInfo = sharedData.products.find((p) => p.id === pid);
    if (!productInfo) {
      return res.status(404).json({ message: "Product not found" });
    }
  }

  const newSale = {
    id: Date.now(),
    amount,
    method,
    product: productInfo ? { ...productInfo } : null,
    createdAt: new Date()
  };

  sharedData.sales.push(newSale);

  console.log("Sale created:", newSale);

  res.status(201).json(newSale);
};

/**
 * Get all sales
 * GET /sales
 */
const getSales = (req, res) => {
  res.json(sharedData.sales);
};

/**
 * ============================================
 * MODULE EXPORTS
 * ============================================
 */
module.exports = {
  createSale,
  getSales,
  createProduct,
  getProducts,
  sharedData
};