const express = require('express');
const path = require('path');
const { body } = require('express-validator');

const userValidations = [ //validaciones de los campos del formulario de registro
    body('name').notEmpty().withMessage('Tienes que escribir un nombre'), //nombre en el formulario de registro
    body('email').notEmpty().withMessage('Escribe un correo electrónico').bail(), //correo en el formulario de registro
    body('password').notEmpty().withMessage('Escribe una contraseña'), //password en el formulario de registro
    //avatar en el formulario de registro
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png']; //unicamente extensiones .jpg y .png

		if (!file) {
			throw new Error('Tienes que subir una imagen');//subir la imagen
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(' y ')}`);
			}
		}
        if (file.size > 1024 * 1024 * 5) {
            throw new Error('El tamaño de la imagen supera los 5MB');

    	}

		return true;
})

]

module.exports = userValidations;