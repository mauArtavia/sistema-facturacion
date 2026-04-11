/**
 * ============================================
 * Products Controller - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Handles product creation and listing for the POS system.
 *
 * This version uses Prisma ORM connected to a SQLite database,
 * replacing the previous in-memory storage (sharedData).
 *
 * Responsibilities:
 * - Validate incoming data
 * - Interact with database through Prisma
 * - Return structured HTTP responses
 *
 * Improvements over previous version:
 * - Persistent storage (data no longer resets)
 * - Cleaner architecture (no shared state between controllers)
 * - Scalable foundation for future features (reports, filters, etc.)
 *
 * Future improvements:
 * - Add DTO/schema validation (Zod or Joi)
 * - Add pagination for product listing
 * - Add update/delete endpoints
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

const prisma = require("../config/prisma");

/**
 * ============================================
 * CREATE PRODUCT
 * ============================================
 * @route   POST /products
 * @desc    Create a new product
 * @access  Public
 * @body    { name: string, price: number }
 */
const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    // Basic validation
    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Name and price are required"
      });
    }

    const parsedPrice = Number(price);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0"
      });
    }

    // Create product in database
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parsedPrice
      }
    });

    console.log("Product created:", newProduct);

    return res.status(201).json(newProduct);

  } catch (error) {
    console.error("Error creating product:", error);

    return res.status(500).json({
      message: "Error creating product"
    });
  }
};

/**
 * ============================================
 * GET PRODUCTS
 * ============================================
 * @route   GET /products
 * @desc    Retrieve all products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(products);

  } catch (error) {
    console.error("Error fetching products:", error);

    return res.status(500).json({
      message: "Error fetching products"
    });
  }
};

/**
 * ============================================
 * MODULE EXPORTS
 * ============================================
 */
module.exports = {
  createProduct,
  getProducts
};