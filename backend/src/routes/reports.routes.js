/**
 * ============================================
 * Reports Routes - Backend Module
 * ============================================
 * Author: mArtavia.dev | Mauricio Artavia Monge
 * Year: 2026
 *
 * Description:
 * Defines HTTP routes for reports management.
 *
 * © 2026 mArtavia.dev — All rights reserved.
 * ============================================
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/reports.controller");

// Get daily report
router.get("/daily", controller.getDailySales);

// Get by method report
router.get("/by-method", controller.getSalesByMethod);

// Get weekly report
router.get("/weekly", controller.getWeeklySales);

// Get by range report
router.get("/range", controller.getSalesByRange);

module.exports = router;