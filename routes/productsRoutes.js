const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const upload = require('../middlewares/multer');
const productsValidation = require('../middlewares/validateProductsMd');
const editProductsValidation = require('../middlewares/validateEditProductsMd');
const adminMiddleware = require('../middlewares/adminMiddleware');
/*requiero el Middleware Multer para subir imágenes/archivos al JSON*/
const authMiddleware = require('../middlewares/authMiddleware');
const productsController = require('../controllers/productsController');

// Route create a new product
router.get('/create', adminMiddleware, productsController.createProducts);
router.post('/', upload.single('image'), productsValidation, productsController.storeProducts)


// Route to Carrito de Compras (en construcción)
router.get('/cart', authMiddleware, productsController.cartProducts);

// Route to get all products
router.get('/', productsController.getAllProducts);

// Route to get a product by category
router.get("/:category", productsController.productFilter);

// Route to get a product by id
router.get("/oneProduct/:id", productsController.productDetail);

//search by model or description
router.get("/search/:search", productsController.searchProduct);

//router.post('/', upload.single('image'), productsController.storeProducts); //permite subir de a una imagen
//router.post('/', upload.array('image', 3), validate, productsController.storeProducts); //permite subir de a muchas imágenes

// Route edit a products
router.get('/edit/:id', adminMiddleware, productsController.editProducts);
router.put('/edit/:id', upload.single('image'), editProductsValidation, productsController.updateProducts)


// Route to delete a product
router.delete('/delete/:id', productsController.deleteProduct);

module.exports = router;