const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories
} = require("../controllers/categories.controller");

// POST /categories
router.post("/", createCategory);

// GET /categories
router.get("/", getCategories);

module.exports = router;