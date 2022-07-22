const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');
const productsController = require('../controllers/productsController');

// Route create a new product
router.get('/create', productsController.createProducts);

// Route to Carrito de Compras (en construcción)
router.get('/cart', productsController.cartProducts);

// Route to get all products
router.get('/', productsController.getAllProducts);

// Route to get a product by category
router.get("/:category", productsController.productFilter);

// Route to get a product by id
router.get("/oneProduct/:id", productsController.productDetail);

//router.post('/', upload.single('image'), productsController.storeProducts);
router.post('/', upload.array('image', 3), productsController.storeProducts);

// Route edit a products
router.get('/edit/:id', productsController.editProducts);
router.put('/:id', productsController.updateProducts)

// Route to delete a product
router.delete('/:id', productsController.deleteProduct);

module.exports = router;