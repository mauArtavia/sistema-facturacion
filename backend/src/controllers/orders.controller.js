const prisma = require("../config/prisma");

/**
 * CREATE TABLE
 */
const createTable = async (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({ message: "Table number is required" });
    }

    // 🔥 evitar duplicados abiertos
    const existing = await prisma.table.findFirst({
      where: {
        number: String(number),
        status: "open"
      }
    });

    if (existing) {
      return res.status(400).json({
        message: "Ya existe una mesa abierta con ese número"
      });
    }

    const table = await prisma.table.create({
      data: {
        number: String(number),
        status: "open",
        total: 0
      }
    });

    return res.status(201).json(table);

  } catch (error) {
    console.error("Error creating table:", error);
    return res.status(500).json({ message: "Error creating table" });
  }
};

/**
 * GET TABLES
 */
const getTables = async (req, res) => {
  try {
    const tables = await prisma.table.findMany({
      where: { status: "open" },
      orderBy: { createdAt: "desc" },
      include: {
        sales: {
          include: { product: true }
        },
        payments: true // 🔥 IMPORTANTE
      }
    });

    return res.json(tables);

  } catch (error) {
    console.error("Error fetching tables:", error);
    return res.status(500).json({ message: "Error fetching tables" });
  }
};

/**
 * ADD ITEM TO TABLE
 */
const addItemToTable = async (req, res) => {
  try {
    const tableId = Number(req.params.id);
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const table = await prisma.table.findUnique({
      where: { id: tableId }
    });

    if (!table || table.status !== "open") {
      return res.status(404).json({ message: "Table not found or closed" });
    }

    const sale = await prisma.sale.create({
      data: {
        amount: product.price,
        method: "table",
        productId: product.id,
        tableId: table.id
      }
    });

    const updatedTable = await prisma.table.update({
      where: { id: tableId },
      data: {
        total: table.total + product.price
      }
    });

    return res.json({ sale, table: updatedTable });

  } catch (error) {
    console.error("Error adding item to table:", error);
    return res.status(500).json({ message: "Error adding item" });
  }
};

/**
 * CHECKOUT TABLE (🔥 NUEVO SISTEMA REAL)
 */
const checkoutTable = async (req, res) => {
  try {
    const tableId = Number(req.params.id);
    const { method, amount } = req.body;

    if (!method) {
      return res.status(400).json({
        message: "Payment method is required"
      });
    }

    const table = await prisma.table.findUnique({
      where: { id: tableId },
      include: { payments: true }
    });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (table.status !== "open") {
      return res.status(400).json({
        message: "Table already closed"
      });
    }

    // 🔥 total pagado
    const paidTotal = table.payments.reduce(
      (acc, p) => acc + p.amount,
      0
    );

    const remaining = table.total - paidTotal;

    if (remaining <= 0) {
      return res.status(400).json({
        message: "Nothing to pay"
      });
    }

    let parsedAmount;

    // =========================
    // 🔥 CASO 1: PAGO COMPLETO
    // =========================
    if (amount === undefined) {
      parsedAmount = remaining;
    }

    // =========================
    // 🔥 CASO 2: PAGO PARCIAL
    // =========================
    else {
      parsedAmount = Number(amount);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({
          message: "Invalid amount"
        });
      }

      if (parsedAmount > remaining) {
        return res.status(400).json({
          message: "Amount exceeds remaining",
          remaining
        });
      }
    }

    // 🔥 registrar pago
    await prisma.payment.create({
      data: {
        amount: parsedAmount,
        method,
        tableId
      }
    });

    const newRemaining = remaining - parsedAmount;

    let updatedTable = table;

    // 🔥 cerrar mesa SOLO cuando se paga todo
    if (newRemaining <= 0.01) {
      updatedTable = await prisma.table.update({
        where: { id: tableId },
        data: { status: "closed" }
      });
    }

    return res.json({
      message: newRemaining <= 0.01
        ? "Table closed"
        : "Partial payment applied",
      remaining: newRemaining,
      table: updatedTable
    });

  } catch (error) {
    console.error("Error checking out table:", error);
    return res.status(500).json({
      message: "Error checking out table"
    });
  }
};

module.exports = {
  createTable,
  getTables,
  addItemToTable,
  checkoutTable
};