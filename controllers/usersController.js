const fs = require("fs"); //requiero el fs que sirve para leer y escribir archivos
const path = require("path");
const usersListPath = path.resolve(__dirname, "../database/users.json");
const usersList = JSON.parse(fs.readFileSync(usersListPath, "utf-8"));

const usersModel = require("../models/usersModel");

const usersController = {
    login: (req, res) => {
        //funcion para logearse
        res.render("users/login", { styles: "login" }); //renderizo la vista login
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("user");
        res.redirect("/");
    },
    processLogin: (req, res) => {
        try {
            let currentUser = {
                email: req.body.email,
                password: req.body.password,
            };

            let validate = usersModel.validateUser(currentUser);

            if (validate) {
                req.session.user = validate;
                if (req.body.remember) {
                    res.cookie("user", validate.name, {
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                    });
                }
                res.redirect("/"); // a la ruta
            }
        } catch (error) {
            res.json({
                success: false,
                error: error.message,
            });
        }
    },
    register: (req, res) => {
        //creo una función para registrar un usuario
        res.render("users/register", { styles: "register" }); //renderizo la vista register
    },
    processRegister: (req, res) => {
        //proceso el registro de crear un usuario
        const currentUser = req.body; //creo una variable currentUser que me trae el body del formulario
        const listUsers = usersModel.getAll(); //creo una variable listUsers que me trae la lista de usuarios

        const newUser = listUsers.find((user) => {
            if (user.email == currentUser.email) {
                //si el email del usuario es igual al email que se ingresa en el formulario
                res.render("users/register", {
                    styles: "register",
                    error: "El email ya existe",
                });
            }
        });
        if (!newUser) {
            //si el usuario no existe
            usersModel.createUsers(currentUser); //creo un nuevo usuario
            res.redirect("/"); //y redirijo al usuario a la página principal
        }
    },
};
module.exports = usersController;
