/**
 * ============================================
 * Categories Controller
 * ============================================
 */

const prisma = require("../config/prisma");

/**
 * 🔧 NORMALIZE NAME
 */
const normalizeCategoryName = (name) => {
  return name.trim().toLowerCase();
};

/**
 * CREATE CATEGORY
 */
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const formattedName = normalizeCategoryName(name);

    const existing = await prisma.category.findFirst({
      where: { name: formattedName }
    });

    if (existing) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }

    const category = await prisma.category.create({
      data: { name: formattedName }
    });

    return res.status(201).json(category);

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    console.error("🔥 MESSAGE:", error.message);
    console.error("🔥 STACK:", error.stack);

    return res.status(500).json({
      message: "Error creating category"
    });
  }
};

/**
 * GET CATEGORIES
 */
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }
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