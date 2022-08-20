const bcryptjs = require('bcryptjs');

const {validationResult} = require('express-validator');


const User = require('../models/usersModel');


const controller = {
	register: (req, res) => {
		res.render('users/register',{styles: "register"});
	},
	processRegister: (req, res) => {
		
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),
				oldData: req.body,
                styles: "register",
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('users/register', {
				errors: {
					email: {
						msg: '*Este email ya está registrado'
					}
				},
				oldData: req.body,
                styles: "register",
			});
		}
		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file,
			admin: false,
		}

		let userCreated = User.create(userToCreate);
		
		return res.redirect('./login');

	},
	login: (req, res) => {
		return res.render('users/login', {styles:"login"});
	},
	processLogin: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('./profile');
			} 
			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				},
                styles:"login",
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			},
            styles:"login",
		});
	},
	profile: (req, res) => {
		return res.render("users/profile", {
			user: req.session.userLogged,
            styles:"profile",
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = controller;