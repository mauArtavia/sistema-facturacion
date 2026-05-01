const prisma = require("../config/prisma");
const { v4: uuidv4 } = require("uuid");

/**
 * CREATE SALE
 */
const createSale = async (req, res) => {
  try {
    const { amount, method, productId, transactionId } = req.body;

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

    const txId = transactionId || uuidv4();

    // 🔥 DUPLICATE CHECK (CORRECTO)
    const existingSale = await prisma.sale.findUnique({
      where: { transactionId: txId }
    });

    if (existingSale) {
      return res.status(409).json({
        message: "Duplicate transaction",
        sale: existingSale
      });
    }

    const newSale = await prisma.sale.create({
      data: {
        amount: parsedAmount,
        method,
        productId: product ? product.id : null,
        transactionId: txId
      },
      include: {
        product: true
      }
    });

    return res.status(201).json(newSale);

  } catch (error) {
    console.error("Error creating sale:", error);

    return res.status(500).json({
      message: "Error creating sale"
    });
  }
};

/**
 * GET SALES
 */
const getSales = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      include: { product: true },
      orderBy: { createdAt: "desc" }
    });

    return res.json(sales);

  } catch (error) {
    console.error("Error fetching sales:", error);

    return res.status(500).json({
      message: "Error fetching sales"
    });
  }
};

module.exports = {
  createSale,
  getSales
};