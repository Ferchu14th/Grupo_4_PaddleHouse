const bcryptjs = require('bcryptjs');
const fs = require ("fs")
const {validationResult} = require('express-validator');
const { v4: uuidv4 } = require ("uuid")
const path = require('path');

const User = require('../models/usersModel');
const usersListPath = path.join(__dirname,"../database/Users.json");
const usersList = JSON.parse(fs.readFileSync(usersListPath,"utf-8"));

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
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body,
                styles: "register",
			});
		}
		
		let user = req.body;
		
		
		user.password = bcryptjs.hashSync(user.password, 10);

		if (resultValidation.errors.length == 0) {
            usersList.push(user);
            fs.writeFileSync(usersListPath, JSON.stringify(usersList, null, 2))
			return res.redirect('./login');
		}
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
            styles:"login",
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = controller;