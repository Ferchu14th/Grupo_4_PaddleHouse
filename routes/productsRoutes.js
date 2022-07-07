const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/detail', productsController.detail);

router.get('/cart', productsController.cart);

router.get('/list/:categoria', productsController.productFilter);

router.get('/crear', productsController.crear);

router.get('/modificar', productsController.modificar);

module.exports = router;