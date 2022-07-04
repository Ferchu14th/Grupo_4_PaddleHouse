const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.detail);

router.get('/cart', productsController.cart);

module.exports = router;