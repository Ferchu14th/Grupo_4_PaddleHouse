const { application } = require("express");

const products = [
  {
    id: 1,
    category: "PALETA",
    brand: "ADIDAS",
    model: "MatchLigth",
    price: 35000,
    imagen: "/images/Paleta_AdidasMatchLigth31",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 2,
    category: "PALETA",
    brand: "KELME",
    model: "Lycan",
    price: 25000,
    imagen: "/images/Paleta_KelmeLycan",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 3,
    category: "PALETA",
    brand: "KELME",
    model: "Falcon",
    price: 22500,
    imagen: "/images/Paleta_KelmeFalcon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 4,
    category: "ACCESORIOS",
    brand: "Softee",
    model: "Cubre Grip Confort",
    price: 650,
    imagen: "/images/Accesorio_CubreGripSofteeConfortPerforadox60",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 5,
    category: "ACCESORIOS",
    brand: "ADIDAS",
    model: "Grip Paddle Performance Blanco",
    price: 450,
    imagen: "/images/Accesorio_GripAdidasPadelPerformance1blanco",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 6,
    category: "ACCESORIOS",
    brand: "ADIDAS",
    model: "Grip Paddle Performance Rojo",
    price: 500,
    imagen: "/images/Accesorio_GripAdidasPadelPerformance1rojo",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 7,
    category: "BOLSOS PALETERO",
    brand: "ADIDAS",
    model: "Multigame Lite White",
    price: 29000,
    imagen: "/images/Bolsos_PaleteroAdidasMultigameLiteWhite",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 8,
    category: "BOLSOS PALETERO",
    brand: "ADIDAS",
    model: "Weekend White",
    price: 22300,
    imagen: "/images/Bolsos_PaleteroAdidasWeekendWhite20",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
  {
    id: 9,
    category: "BOLSOS PALETERO",
    brand: "ADIDAS",
    model: "Weekend Green",
    price: 25000,
    imagen: "/images/Bolsos_PaleteroAdidasWeekendVerde",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
  },
];

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
    const clasificacion = req.params.category;
    const nuevaLista = products.filter(
      (element) => element.category == clasificacion
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
  create: (req, res) => {
    res.render("products/create", { styles: "register" });
  },
  edit: (req, res) => {
    res.render("products/edit", { styles: "register" });
  },
};