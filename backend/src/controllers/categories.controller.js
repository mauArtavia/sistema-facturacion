/**
 * ============================================
 * Categories Controller
 * ============================================
 */

const prisma = require("../config/prisma");

/**
 * ============================================
 * CREATE CATEGORY
 * ============================================
 * @route POST /categories
 */
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    // 🔥 evitar duplicados
    const existing = await prisma.category.findUnique({
      where: { name }
    });

    if (existing) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }

    const category = await prisma.category.create({
      data: { name }
    });

    return res.status(201).json(category);

  } catch (error) {
    console.error("Error creating category:", error);

    return res.status(500).json({
      message: "Error creating category"
    });
  }
};

/**
 * ============================================
 * GET CATEGORIES
 * ============================================
 * @route GET /categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc"
      }
    });

    return res.json(categories);

  } catch (error) {
    console.error("Error fetching categories:", error);

    return res.status(500).json({
      message: "Error fetching categories"
    });
  }
};

module.exports = {
  createCategory,
  getCategories
};