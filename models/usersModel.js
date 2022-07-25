// el modelo tiene que leer mi base de datos con la librería fs, hacer el path de la base de datos, y leerla con el método readFileSync
// además necesito encriptar el password con el método bcrypt.hashSync y generar id con uuidv4

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const User = {
    usersListPath: path.resolve(__dirname, "../database/Users.json"),
    getAll: () => {
        const usersList = JSON.parse(fs.readFileSync(User.usersListPath, "utf-8"));
        return usersList;
    },
    createUsers: (user) => {
        let newUser = {
            id: uuidv4(),
            name: user.name,
            email: user.email,
            password: bcrypt.hashSync(user.password, 10)
        };
        const usersList = User.getAll();
        usersList.push(newUser);
        fs.writeFileSync(User.usersListPath, JSON.stringify(usersList, null, 2));
    }
}

module.exports = User;
