/**
 * ============================================
 * Sales Controller - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Handles all operations related to sales in the POS system.
 *
 * This controller uses Prisma ORM connected to a SQLite database,
 * replacing the previous in-memory storage approach.
 *
 * Responsibilities:
 * - Validate incoming sale data
 * - Link sales optionally to products
 * - Persist sales in the database
 * - Retrieve sales with associated product information
 *
 * Key Features:
 * - Supports sales with or without linked products
 * - Automatically includes product data in responses
 * - Ensures data integrity through validation
 *
 * Improvements over previous version:
 * - Persistent storage (sales survive server restarts)
 * - Relational data (sales ↔ products)
 * - Scalable query structure for reports and filters
 *
 * Future improvements:
 * - Add filters (date range, method)
 * - Add aggregations (daily, weekly reports)
 * - Add pagination for large datasets
 * - Add DTO/schema validation (Zod or Joi)
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

const prisma = require("../config/prisma");

/**
 * ============================================
 * CREATE SALE
 * ============================================
 * @route   POST /sales
 * @desc    Create a new sale
 * @access  Public
 * @body    { amount: number, method: string, productId?: number }
 */
const createSale = async (req, res) => {
  try {
    const { amount, method, productId } = req.body;

    // Basic validation
    if (amount === undefined || !method) {
      return res.status(400).json({
        message: "Amount and method are required"
      });
    }

    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0"
      });
    }

    let product = null;

    /**
     * Validate and fetch product if productId is provided
     */
    if (productId) {
      const pid = Number(productId);

      if (!isNaN(pid)) {
        product = await prisma.product.findUnique({
          where: { id: pid }
        });

        if (!product) {
          return res.status(404).json({
            message: "Product not found"
          });
        }
      }
    }

    /**
     * Create sale in database
     */
    const newSale = await prisma.sale.create({
      data: {
        amount: parsedAmount,
        method,
        productId: product ? product.id : null
      },
      include: {
        product: true
      }
    });

    console.log("Sale created:", newSale);

    return res.status(201).json(newSale);

  } catch (error) {
    console.error("Error creating sale:", error);

    return res.status(500).json({
      message: "Error creating sale"
    });
  }
};

/**
 * ============================================
 * GET SALES
 * ============================================
 * @route   GET /sales
 * @desc    Retrieve all sales with product info
 * @access  Public
 */
const getSales = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        product: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(sales);

  } catch (error) {
    console.error("Error fetching sales:", error);

    return res.status(500).json({
      message: "Error fetching sales"
    });
  }
};

/**
 * ============================================
 * MODULE EXPORTS
 * ============================================
 */
module.exports = {
  createSale,
  getSales
};