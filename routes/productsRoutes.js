const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');
const productsController = require('../controllers/productsController');

// Route to get all products
router.get('/', productsController.getAllProducts);

// Route create a new product
router.get('/create', productsController.createProducts);
//router.post('/', upload.single('image'), productsController.storeProducts);
router.post('/', upload.array('image', 3), productsController.storeProducts);

// Route to get a product by id
//router.get('/:id', productsController.getProductById);

// Route edit a products
router.get('/edit/:id', productsController.editProducts);
router.put('/:id', productsController.updateProducts)

// Route to get a product by category
router.get("/:detail", productsController.productFilter);

// Route to delete a product
router.delete('/:id', productsController.deleteProduct);

// Route to Carrito de Compras (en construcción)
router.get('/', productsController.cartProducts)

module.exports = router;