const express = require('express');
const path = require('path');
const { body } = require('express-validator');

const userValidations = [
    body('name').notEmpty().withMessage('*Tienes que escribir un nombre'),
    body('email').notEmpty().withMessage('*Escribe un correo electrónico').bail()
    .isEmail().withMessage('*Mail invalido'),
    body('password').notEmpty().withMessage('*Escribe una contraseña'),
   
]

module.exports = userValidations;