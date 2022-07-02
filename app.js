const express = require('express');
const app = express();

const PORT = process.env.PORT || 3050;

/*const mainRoutes = require('./routes/mainRoutes');*/


app.use(express.static('public'));


app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/src/views/index.html');
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/src/views/login.html');
});

app.get('/productCart', (req,res)=>{
    res.sendFile(__dirname + '/src/views/productCart.html');
});

app.get('/productDetail', (req,res)=>{
    res.sendFile(__dirname + '/src/views/productDetail.html');
});

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/src/views/register.html');
});

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});