// el modelo tiene que leer mi base de datos con la librería fs, hacer el path de la base de datos, y leerla con el método readFileSync
// además necesito encriptar el password con el método bcrypt.hashSync y generar id con uuidv4

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const User = {
    usersListPath: path.resolve(__dirname, "../database/Users.json"),
    getAll: () => {
        //funcion para leer mi base de datos
        const usersList = JSON.parse(fs.readFileSync(User.usersListPath, "utf8")); //creo una variable usersList que me trae la lista de usuarios
        return usersList; //retorno la lista de usuarios
    },
    createUsers: (user) => {
        //Objeto con toda la data que nosotros vamos a persistir (e.d. que se guarde en la base)
        let newUser = {
            id: uuidv4(),
            name: user.name,
            email: user.email,
            password: bcrypt.hashSync(user.password, 10)
        };
        //llamo de nuevo a mi metodo getAll que nos traiga todos los usuarios que guardo en usersList
        let usersList = User.getAll();
        //agrego el nuevo usuario que pusheo a mi array usersList, de esta manera puedo actualizar el archivo JSON a continuación
        usersList.push(newUser);
        //escribo en el archivo JSON el nuevo usuario
        fs.writeFileSync(User.usersListPath, JSON.stringify(usersList, null, 2));
        
    },
    validateUser: (viewUser) => {
        //valido el usuario
        let usersList = User.getAll(); //creo una variable usersList que me trae la lista de usuarios
        let currentUser = usersList.find((user) => {
            //creo una variable currentUser que me trae el usuario que se loguea
            if (
                user.email == viewUser.email && //si el email del usuario es igual al email que se ingresa en el formulario
                bcrypt.compareSync(viewUser.password, user.password)
            ) {
                //y si el password del usuario es igual al password que se ingresa en el formulario
                return user;
            }
        });
        if (currentUser) {
            //si el usuario existe
            return currentUser; //retorno el usuario
        }
        throw new Error("Usuario no encontrado");
    }
}
module.exports = User;
