const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const { Op } = require("sequelize");
const sequelize = db.sequelize;
//const User = require('../database/models/Users');


const controller = {
	register: (req, res) => {
        res.render('users/register'  ,{styles: "register"});
    },

    processRegister: async (req, res) => {
        const resultValidation = validationResult(req);

if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),
				oldData: req.body,
                styles: "register",
			});
		}
        let usuarioRepetido = await db.Users.findOne({
            where: {
                email: { [Op.like]: req.body.email }
            }
        })
        
        if (!resultValidation.errors.length && !usuarioRepetido) {
            
            db.Users.create({
				name: req.body.name,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                // repeatPassword: bcryptjs.hashSync(req.body.repeatPassword, 12),
                avatar: req.files,
				isAdmin: false,
            }).then(function(user) {
                req.session.userLogged = user;
                res.redirect("/")
            })
        } else {
            if (usuarioRepetido) {
                return res.render('users/register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body,
					styles: "register"
            })} else {
                
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
					styles: "register"
                });
            }
        }
    },
	
	login: (req, res) => {
		return res.render('users/login', {styles:"login"});
	},
	processLogin: async(req, res) => {
		let userToLogin = await db.Users.findOne({
            where: {
                email: { [Op.like]: req.body.email }
            }
        })
		
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