const { application } = require("express");

const products = [
  {
    id: 1,
    categoria: "PALETA",
    marca: "ADIDAS",
    modelo: "MatchLigth",
    precio: 35000,
    imagen: "/images/Paleta_AdidasMatchLigth31",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 2,
    categoria: "PALETA",
    marca: "KELME",
    modelo: "Lycan",
    precio: 25000,
    imagen: "/images/Paleta_KelmeLycan",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 3,
    categoria: "PALETA",
    marca: "KELME",
    modelo: "Falcon",
    precio: 22500,
    imagen: "/images/Paleta_KelmeFalcon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 4,
    categoria: "ACCESORIOS",
    marca: "Softee",
    modelo: "Cubre Grip Confort",
    precio: 650,
    imagen: "/images/Accesorio_CubreGripSofteeConfortPerforadox60",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 5,
    categoria: "ACCESORIOS",
    marca: "ADIDAS",
    modelo: "Grip Paddle Performance Blanco",
    precio: 450,
    imagen: "/images/Accesorio_GripAdidasPadelPerformance1blanco",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 6,
    categoria: "ACCESORIOS",
    marca: "ADIDAS",
    modelo: "Grip Paddle Performance Rojo",
    precio: 500,
    imagen: "/images/Accesorio_GripAdidasPadelPerformance1rojo",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 7,
    categoria: "BOLSOS PALETERO",
    marca: "ADIDAS",
    modelo: "Multigame Lite White",
    precio: 29000,
    imagen: "/images/Bolsos_PaleteroAdidasMultigameLiteWhite",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 8,
    categoria: "BOLSOS PALETERO",
    marca: "ADIDAS",
    modelo: "Weekend White",
    precio: 22300,
    imagen: "/images/Bolsos_PaleteroAdidasWeekendWhite20",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 9,
    categoria: "BOLSOS PALETERO",
    marca: "ADIDAS",
    modelo: "Weekend Green",
    precio: 25000,
    imagen: "/images/Bolsos_PaleteroAdidasWeekendVerde",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
];

// const paletas = products.filter(producto => {
//     return producto.categoria == "PALETA"
// })

// console.log(paletas)

module.exports = {
  cart: (req, res) => {
    res.render("products/productCart", { styles: "productCart" });
  },
  detail: (req, res) => {
    res.render("./products/productDetail", {
      styles: "productDetail",
      products: products,
    });
  },
  productFilter: (req, res) => {
    const clasificacion = req.params.categoria;
    const nuevaLista = products.filter(
      (element) => element.categoria == clasificacion
    );

    res.render("products/list", {
      styles: "productDetail",
      detail: nuevaLista,
    });
  },
  productDescription: (req, res) => {
    const id = req.params.id;
    const product = products.find(element => element.id == id);

    res.render("products/details", {
      styles: "productDetail",
      product: product,
    });
  },
  crear: (req, res) => {
    res.render("/products/crear", { styles: "register" });
  },
  modificar: (req, res) => {
    res.render("/products/modificar", { styles: "register" });
  },
};
//allProducts: (req, res) => {
//    res.render("products/allProducts", { listaDeProductos: products });
//},
//   OJO ACA CREAR LA VISTA PARA MOSTRAR SOLO LAS PALETAS
//   paletas: (req, res) => {
//     res.render('paletas', {paletas})

//router.get('/allProducts', productsController.allProducts);
