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
const cookieParser = require("cookie-parser");

//ubicación de la carpeta de vistas para express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/****************Middlewares***********************/
// uso los siguientes middlewares para leer lo que viene por formulario
// el "extended: true" fuerza a que sea un objeto literal lo que nos llega por formulario
// y luego lo convierto en JSON (segunda línea de código)
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(userLoggedMiddleware);

/******Rutas INDEX o ENTRY POINT*****/
app.use('/', indexRoutes);

/******Rutas PRODUCTOS con PREFIJO /products para NAVEGADOR ******/
app.use('/products', productsRoutes);

/******Rutas USUARIOS con PREFIJO /users para NAVEGADOR******/
app.use('/users', usersRoutes)

//configuración de public static
app.use(express.static(path.join(__dirname, "public")));

/******este es el Listen que siempre dejamos al final**************/
app.listen(PORT, () => {
    console.log("listening on port http://localhost:" + PORT);
});

/*** Error  ***/
// ** No mover de aquí **
// ** catch 404 and forward to error handler **

app.use((req, res, next) => next(createError(404)));

//Error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;