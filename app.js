const express = require('express');
const app = express();

const indexRoutes = require('./routes/indexRoutes');

const PORT = process.env.PORT || 3050;
app.use(express.static('public'));


app.use('/', indexRoutes);
/*app.get('/', (req,res)=>{
//    res.sendFile(__dirname + '/src/views/index.html');
});*/

//hay que meter ahora los dos productos en productRoutes y productController (como hicimos con el Index) 
app.get('/productCart', (req,res)=>{
    res.sendFile(__dirname + '/src/views/productCart.html');
});

app.get('/productDetail', (req,res)=>{
    res.sendFile(__dirname + '/src/views/productDetail.html');
});

//hay que meter ahora los dos usuarios en usersRoutes y usersController (como hicimos con Productos) 
app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/src/views/login.html');
});

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/src/views/register.html');
});

// este es el Listen que siempre dejamos al final
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});