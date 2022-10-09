const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/apiProductController');

//Lista de productos
router.get('/', productsApiController.list)

//Detalle del producto
router.get('/:id', productsApiController.detail)

module.exports = router;