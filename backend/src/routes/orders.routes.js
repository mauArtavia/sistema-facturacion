const express = require("express");
const router = express.Router();

const {
  createTable,
  getTables,
  addItemToTable,
  checkoutTable,
  quickSale
} = require("../controllers/orders.controller");

// MESAS
router.post("/tables", createTable);
router.get("/tables", getTables);
router.post("/tables/:id/items", addItemToTable);
router.post("/tables/:id/checkout", checkoutTable);

// VENTA RÁPIDA
//router.post("/orders/quick", quickSale);

module.exports = router;