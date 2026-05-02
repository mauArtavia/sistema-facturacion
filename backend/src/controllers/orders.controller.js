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

    // 🔥 VALIDACIÓN: evitar mesas duplicadas abiertas
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

    // 🔥 CREAR MESA
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
    // 🔥 CASO 1: PAGO COMPLETO
    // =========================
    if (!amount) {
      targetSales = pendingSales;
    }

    // =========================
    // 🔥 CASO 2: PAGO PARCIAL (50/50)
    // =========================
    else {
      const parsedAmount = Number(amount);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({
          message: "Invalid amount"
        });
      }

      let accumulated = 0;

      for (const sale of pendingSales) {
        if (accumulated >= parsedAmount) break;

        targetSales.push(sale);
        accumulated += sale.amount;
        console.log("PENDING:", pendingSales.length);
        console.log("AMOUNT REQUESTED:", amount);
      }

      if (targetSales.length === 0) {
        return res.status(400).json({
          message: "Not enough items to cover amount"
        });
      }
    }

    // 🔥 APLICAR PAGO SOLO A LOS SELECCIONADOS
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

    // 🔥 VER SI QUEDAN ITEMS
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
        : "Partial payment applied",
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