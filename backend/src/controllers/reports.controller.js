/**
 * ============================================
 * Reports Controller - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Provides basic sales analytics.
 * 
 * Endpoints:
 * - Daily Sales
 * - Sales by payment method
 * - Weekly total
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

const prisma = require("../config/prisma");

/**
 * ============================================
 * DAILY SALES
 * ============================================
 * @route GET /reports/daily
 * @desc Total sales for today
 */
const getDailySales = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const sales = await prisma.sale.aggregate({
      _sum: { amount: true },
      where: {
        createdAt: {
          gte: start,
          lte: end
        }
      }
    });

    return res.json({
      date: start.toISOString().split("T")[0],
      total: sales._sum.amount || 0
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching daily sales" });
  }
};

/**
 * ============================================
 * SALES BY METHOD
 * ============================================
 * @route GET /reports/by-method
 * @desc Group sales by payment method
 */
const getSalesByMethod = async (req, res) => {
  try {
    const result = await prisma.sale.groupBy({
      by: ["method"],
      _sum: {
        amount: true
      }
    });

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching sales by method" });
  }
};

/**
 * ============================================
 * WEEKLY TOTAL
 * ============================================
 * @route GET /reports/weekly
 * @desc Total sales for last 7 days
 */
const getWeeklySales = async (req, res) => {
  try {
    const start = new Date();
    start.setDate(start.getDate() - 7);
    start.setHours(0, 0, 0, 0); // 🔥 ajuste fino

    const sales = await prisma.sale.aggregate({
      _sum: { amount: true },
      where: {
        createdAt: {
          gte: start
        }
      }
    });

    return res.json({
      from: start.toISOString(),
      total: sales._sum.amount || 0
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching weekly sales" });
  }
};

/**
 * ============================================
 * SALES BY DATE RANGE
 * ============================================
 * @route GET /reports/range
 * @desc Detailed sales report between two dates
 * @query start=YYYY-MM-DD&end=YYYY-MM-DD
 */
const getSalesByRange = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        message: "start and end dates are required (YYYY-MM-DD)"
      });
    }

    const startDate = new Date(start + "T00:00:00.000Z");
    const endDate = new Date(end + "T23:59:59.999Z");

    if (startDate > endDate) {
      return res.status(400).json({
        message: "start date cannot be greater than end date"
      });
    }

    const sales = await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    let total = 0;
    let totalCash = 0;
    let totalCard = 0;
    let totalSinpe = 0;

    for (const s of sales) {
      total += s.amount;

      if (s.method === "cash") totalCash += s.amount;
      else if (s.method === "card") totalCard += s.amount;
      else if (s.method === "sinpe") totalSinpe += s.amount;
    }

    return res.json({
      from: start,
      to: end,
      total,
      totalCash,
      totalCard,
      totalSinpe,
      count: sales.length
    });

  } catch (error) {
    console.error("Error fetching sales by range:", error);
    return res.status(500).json({
      message: "Error fetching sales by range"
    });
  }
};

module.exports = {
  getDailySales,
  getSalesByMethod,
  getWeeklySales,
  getSalesByRange
};