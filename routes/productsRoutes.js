const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/create', productsController.create);

router.get('/edit', productsController.edit);

router.get('/oneProduct/:id', productsController.productDescription);

router.get('/cart', productsController.cart);

router.get('/detail/:category', productsController.productFilter);

router.get('/detail/', productsController.detail);


module.exports = router;