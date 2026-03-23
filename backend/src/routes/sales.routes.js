const express = require('express');
const router = express.Router();

const {
  createSale,
  getSales
} = require('../controllers/sales.controller');

router.post('/', createSale);
router.get('/', getSales);

MediaSourceHandle.exports = router;