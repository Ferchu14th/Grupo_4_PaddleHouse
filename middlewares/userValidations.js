const express = require('express');
const path = require('path');
const { body, check } = require('express-validator');

const userValidations = [
	//validaciones de los campos del formulario de registro
	check("name")
		.notEmpty()
		.withMessage("Tienes que escribir un nombre")
		.bail()
		.isLength({ min: 2 })
		.withMessage("El nombre tiene que tener más de 2 caracteres"), // validación de cantidad de caracteres mínimo
	check("email")
		.notEmpty()
		.withMessage("Escribe un correo electrónico")
		.bail()
		.isEmail()
		.withMessage("Debes escribir un formato de correo válido"), //correo en el formulario de registro
	check("password")
		.notEmpty()
		.withMessage("Escribe una contraseña")
		.bail()
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1
		})
		.withMessage(
			"Su clave debe contener un mínimo de 8 caracteres con al menos 1 letra minúscula, 1 mayúscula un número y un caracter especial"
		),

	body("avatar").custom((value, { req }) => {
		let file = req.file; //avatar en el formulario de registro
		let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"]; //unicamente extensiones validas

		if (!file) {
			throw new Error("Tienes que subir una imagen"); //subir la imagen
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(
					`Las extensiones de archivo permitidas son ${acceptedExtensions.join(
						" y "
					)}`
				);
			}
		}
		if (file.size > 1024 * 1024 * 5) {
			throw new Error("El tamaño de la imagen supera los 5MB");
		}

		return true;
	}),
];

module.exports = userValidations;