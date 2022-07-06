/*const { application } = require("express");

const products = [
    {
        id: 1,
        title: "paleta Babolat",
        price: 9500,
        category: "paleta",
        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    },
    {
        id: 2,
        title: "bolso Wilson",
        price: 25000,
        category: "bolso",
        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    },
    {
        id: 3,
        title: "muñequera que uso nada en rolland garros",
        price: 50000,
        category: "accesorios",
        description:
            "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
    },
];
// const paletas = products.filter(producto => {
//     return producto.category == "paleta"
// })
// console.log(paletas)
*/

module.exports = {
    detail: (req, res) => {
//        const id = req.params.id;
//        const detailProduct = products.find(product => {
//            return product.id == id
//        })
        res.render("./products/productDetail");
        //{ detailProduct }
        
    },
    cart: (req, res) => {
        res.render("products/productCart");
    },
    //allProducts: (req, res) => {
    //    res.render("products/allProducts", { listaDeProductos: products });
    //},
    //   OJO ACA CREAR LA VISTA PARA MOSTRAR SOLO LAS PALETAS
    //   paletas: (req, res) => {
    //     res.render('paletas', {paletas})
    }

    //router.get('/allProducts', productsController.allProducts);


