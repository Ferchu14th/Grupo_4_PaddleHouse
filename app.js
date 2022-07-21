const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const indexRoutes = require("./routes/indexRoutes");
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const PORT = process.env.PORT || 3050;

//setea el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//uso los siguientes middlewares para leer lo que viene por formulario
// el "extended: true" fuerza a que sea un objeto literal lo que nos llega.
// y lo que llega lo haga JSON que es la segunda línea
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//configuración de public static
app.use(express.static(path.join(__dirname, "public")));

/******Nuevas Rutas a través de Routes y Controllers INDEX o ENTRY POINT*****/
app.use('/', indexRoutes);

/******Nuevas Rutas a través de Routes y Controllers PRODUCTOS******/
app.use('/products', productsRoutes);

/******Nuevas Rutas a través de Routes y Controllers USUARIOS******/
app.use('/users', usersRoutes)

/******este es el Listen que siempre dejamos al final**************/
app.listen(PORT, () => {
    console.log("listening on port http://localhost:" + PORT);
});