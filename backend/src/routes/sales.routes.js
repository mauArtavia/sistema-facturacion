const express = require("express");
const router = express.Router();

// 👇 Import completo (más seguro)
const controller = require("../controllers/sales.controller");

// 👇 Usar funciones desde el objeto
router.post("/", controller.createSale);
router.get("/", controller.getSales);

module.exports = router;