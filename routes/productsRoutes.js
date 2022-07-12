const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/create', productsController.create);

router.get('/edit', productsController.edit);

router.get('/oneProduct', productsController.productDescription);

router.get('/cart', productsController.cart);

router.get('/detail/:categoria', productsController.productFilter);


module.exports = router;