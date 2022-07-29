const express = require('express'); // requiero express
const app = express(); // uso la función express para crear una instancia de express
const path = require('path'); // creo rutas absolutas
const methodOverride = require('method-override'); // paquete para usar PUT y DELETE
const session = require('express-session'); // paquete para usar sesiones y loguearse

const PORT = process.env.PORT || 3050; // creo una variable que me trae el puerto que me pasa el servidor

// Routes
const indexRoutes = require("./routes/indexRoutes");
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const rememberMe = require("./middlewares/rememberMe");
const cookieParser = require("cookie-parser");

//ubicación de la carpeta de vistas para express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/****************Middlewares***********************/
// uso los siguientes middlewares para leer lo que viene por formulario
// el "extended: true" fuerza a que sea un objeto literal lo que nos llega por formulario
// y luego lo convierto en JSON (segunda línea de código)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    //    cookie: {maxAge: 60000},
}));
app.use(rememberMe);

/******Nuevas Rutas a través de Routes y Controllers INDEX o ENTRY POINT*****/
app.use('/', indexRoutes);

/******Nuevas Rutas a través de Routes y Controllers PRODUCTOS con PREFIJO /products ******/
app.use('/products', productsRoutes);

/******Nuevas Rutas a través de Routes y Controllers USUARIOS******/
app.use('/users', usersRoutes)

//configuración de public static
app.use(express.static(path.join(__dirname, "public")));

/******este es el Listen que siempre dejamos al final**************/
app.listen(PORT, () => {
    console.log("listening on port http://localhost:" + PORT);
});