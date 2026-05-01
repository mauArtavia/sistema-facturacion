/**
 * ============================================
 * Products Controller - Backend Module
 * ============================================
 */

const prisma = require("../config/prisma");

/**
 * ============================================
 * CREATE PRODUCT
 * ============================================
 */
const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

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

    // validar categoría
    if (categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: Number(categoryId) }
      });

      if (!categoryExists) {
        return res.status(400).json({
          message: "Invalid category"
        });
      }
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name.trim(),
        price: parsedPrice,
        categoryId: categoryId ? Number(categoryId) : null
      },
      include: {
        category: true // 🔥 clave para el POS
      }
    });

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
 */
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true // 🔥 esto es lo que habilita categorías en frontend
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

module.exports = {
  createProduct,
  getProducts
};