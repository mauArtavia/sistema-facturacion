/**
 * ============================================
 * Sales Controller - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * This controller handles all sales-related operations including creation and
 * retrieval of sales records.
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

// Temporary in-memory storage
let sales = [];

/**
 * ============================================
 * Create a new sale
 * ============================================
 * Endpoint: POST /sales
 *
 * Body:
 * {
 *   amount: number,
 *   method: "cash" | "card" | "simpe"
 * }
 *
 * Description:
 * Validates input data, creates a new sale object, stores it in memory, and
 * returns the created sale.
 */
const createSale = (req, res) => {
  console.log("Incoming request body:", req.body);

  const { amount, method } = req.body;

  // Basic validation
  if (!amount || !method) {
    return res.status(400).json({
      message: "Amount and method are required"
    });
  }

  // Create new sale object
  const newSale = {
    id: Date.now(), // Simple unique identifier
    amount,
    method,
    createdAt: new Date() // Timestamp
  };

  // Store sale
  sales.push(newSale);

  console.log("Sale successfully created:", newSale);

  // Return created sale
  res.status(201).json(newSale);
};

/**
 * ============================================
 * Get all sales
 * ============================================
 * Endpoint: GET /sales
 *
 * Description:
 * Returns the full list of stored sales.
 */
const getSales = (req, res) => {
  res.json(sales);
};

/**
 * ============================================
 * Module Exports
 * ============================================
 * Explicit export for clarity and scalability.
 */
module.exports = {
  createSale,
  getSales
};