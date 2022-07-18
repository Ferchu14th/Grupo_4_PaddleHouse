const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Route to get all products
router.get('/', productsController.detailProducts);

// Route to Carrito de Compras (en construcción)
router.get('/', productsController.cartProducts);

// Route create a new product
router.get('/create', productsController.createProducts);
router.post('/', productsController.storeProducts);

// Route to get a product by category
router.get("/:detail", productsController.productFilter);

// Route edit a products
router.get('/edit/:id', productsController.editProducts);
router.put('/:id', productsController.updateProducts)



module.exports = router;