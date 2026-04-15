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
 * @route   POST /products
 * @body    { name: string, price: number, categoryId?: number }
 */
const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    // 🔍 VALIDACIONES
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

    // 🔥 VALIDAR CATEGORÍA (si viene)
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

    // ✅ CREAR PRODUCTO
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parsedPrice,
        categoryId: categoryId ? Number(categoryId) : null
      },
      include: {
        category: true // 🔥 importante
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
 */
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        category: true // 🔥 ahora devuelve categoría
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