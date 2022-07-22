const { application } = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
//Tenemos un objeto literal (productList) con datos, que estamos ubicando, listando y parseando.
const productListPath = path.resolve(__dirname, "../database/products.json");
const productList = JSON.parse(fs.readFileSync(productListPath, "utf-8"));

module.exports = {
  // Vista de todos los productos
  getAllProducts: (req, res) => {
    res.render("./products/allProducts", {
      styles: "allProducts",
      products: productList,
    });
  },
  productDetail: (req, res) => {
    let id = req.params.id;
    let product = productList.find((e) => e.id == id);

    res.render("./products/oneProduct", {
      styles: "oneProduct",
      products: product,
    });
  },

    // Carrito de Compras que por ahora no tocamos
    cartProducts: (req, res) => {
      res.render("products/productCart", { styles: "productCart" });
    },

  // Método x 2: Formulario de creación de productos con método GET (renderización) createProducts y 
  // POST(procesamiento) StoreProducts
  createProducts: (req, res) => {
    res.render("products/createProducts", {
      styles: "register",
    });
  },
  storeProducts: (req, res) => {
    let product = req.body;
    let image = req.file;
    let images = req.files;

    product.id = uuidv4();

    if (image) {
      product.image = image.filename;
    } else if (images) {
      product.image = images.map(image => image.filename);
    }

    //voy creando el array con push
    productList.push(product);

    //voy grabando en JSON
    fs.writeFileSync(productListPath, JSON.stringify(productList, null, 2));

    res.redirect("/products");
  },
  
  // Método x 2 para la modificación/edición de un producto con método GET (renderización) editproducts y PUT (procesamiento)
  editProducts: (req, res) => {
    const id = req.params.id;
    const product1 = productList.find((element) => element.id == id);

    res.render("products/editProducts", {
      styles: "register",
      product: product1,
    });
  },

  updateProducts: (req, res) => {
    let id = req.params.id;
    let newProduct = req.body;

    newProduct.id = id;

    for (let index = 0; index < productList.length; index++) {
      const element = productList[index];
      if (element.id == id) {
        productList[index] = newProduct;
      }
    }
    //hay que actualizar el archivo con fs (como hicimos con el producto) el null y el 2 es fijo para que mantenga el formato el JSON.
    fs.writeFileSync(productListPath, JSON.stringify(productList, null, 2));

    res.redirect("/products");
  },

  deleteProduct: (req, res) => {
    let id = req.params.id;
    console.log("deleteProduct", id);
    for (let index = 0; index < productList.length; index++) {
      const element = productList[index];
      if (element.id == id) {
        productList.splice(index, 1);
      }
    }

    fs.writeFileSync(productListPath, JSON.stringify(productList, null, 2));

    res.redirect("/products");
  },

  // revisar
  productFilter: (req, res) => {
    const clasificacion = req.params.category;
    const nuevaLista = productList.filter((e) => e.category == clasificacion);

    res.render("products/allProducts", {
      styles: "allProducts",
      products: nuevaLista,
    });
  },


};
