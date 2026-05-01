const prisma = require("../config/prisma");
const { v4: uuidv4 } = require("uuid");

/**
 * CREATE TABLE
 */
const createTable = async (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({ message: "Table number is required" });
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
        }
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
        tableId: table.id,
        transactionId: null
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
 * CHECKOUT TABLE (FIX REAL ESTADO CONSISTENTE)
 */
const checkoutTable = async (req, res) => {
  try {
    const tableId = Number(req.params.id);
    const { method, salesIds, amount } = req.body;

    const table = await prisma.table.findUnique({
      where: { id: tableId },
      include: { sales: true }
    });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (table.status !== "open") {
      return res.status(400).json({
        message: "Table already closed"
      });
    }

    // 🔥 SOLO VENTAS PENDIENTES
    const pendingSales = table.sales.filter(
      (s) => s.transactionId === null
    );

    if (pendingSales.length === 0) {
      return res.status(400).json({
        message: "Nothing to pay"
      });
    }

    const txId = uuidv4();

    let targetSales = [];

    // =========================
    // SPLIT POR ITEMS
    // =========================
    if (salesIds && salesIds.length > 0) {
      targetSales = pendingSales.filter((s) =>
        salesIds.includes(s.id)
      );

      if (targetSales.length === 0) {
        return res.status(400).json({
          message: "Selected items already paid or invalid"
        });
      }
    }

    // =========================
    // SPLIT POR MONTO / CUENTA COMPLETA
    // =========================
    else if (amount) {
      const remainingTotal = pendingSales.reduce(
        (acc, s) => acc + s.amount,
        0
      );

      const parsedAmount = Number(amount);

      if (parsedAmount <= 0 || parsedAmount > remainingTotal) {
        return res.status(400).json({
          message: "Invalid amount",
          remaining: remainingTotal
        });
      }

      targetSales = pendingSales; // el pago es global
    }

    else {
      return res.status(400).json({
        message: "Missing payment data"
      });
    }

    // 🔥 ACTUALIZAR SOLO VENTAS PENDIENTES
    await prisma.sale.updateMany({
      where: {
        id: { in: targetSales.map((s) => s.id) },
        transactionId: null
      },
      data: {
        method,
        transactionId: txId
      }
    });

    // 🔥 recalcular pendientes
    const stillPending = await prisma.sale.count({
      where: {
        tableId,
        transactionId: null
      }
    });

    let updatedTable = table;

    if (stillPending === 0) {
      updatedTable = await prisma.table.update({
        where: { id: tableId },
        data: { status: "closed" }
      });
    }

    return res.json({
      message: stillPending === 0
        ? "Table closed"
        : "Payment applied",
      transactionId: txId,
      remainingItems: stillPending,
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