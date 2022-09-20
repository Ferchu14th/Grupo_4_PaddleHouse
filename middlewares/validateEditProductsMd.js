const path = require('path');
const { body, check } = require('express-validator');

const editProductsValidation = [

    check('category')
    .notEmpty().withMessage('El campo "category" está vacío').bail()
    .isLength({min: 5}).withMessage('El campo debe tener al menos 5 caracteres'),
	check('brand')
    .notEmpty().withMessage('El campo "brand" está vacío').bail()
    .isLength({min: 3}).withMessage('El campo debe tener al menos 3 caracteres'),
	check('model')
    .notEmpty().withMessage('El campo "model" está vacío').bail()
    .isLength({min: 3}).withMessage('El campo debe tener al menos 3 caracteres'),
    check('price')
    .notEmpty().withMessage('El campo "Precio" está vacío').bail()
    .isNumeric().withMessage('Debe ingresar un precio númerico'),
	check('description')
    .notEmpty().withMessage('El campo "Descripción" está vacío').bail()
    .isLength({min: 15}).withMessage('El campo debe tener al menos 15 caracteres'),
    body('image').custom((value, { req })=>{
		let file = req.file;
		let acceptedExtensions = ['.jpg','.png','.gif'];

		if (!file){
			throw new Error('Tienes que subir una imagen');
		}else{
			let fileExtension = path.extname(file.originalname);
			if(!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})


]

module.exports = editProductsValidation;