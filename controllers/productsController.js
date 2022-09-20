const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;

const { validationResult } = require("express-validator");

const productsController = {
  //Muestra todos los productos en LH:3000/products
  getAllProducts: async (req, res) => {
    //llamamos a la DB y mostramos todos los prods.
    let userLogged = await req.session.userLogged;

    db.Products.findAll()
      .then((response) => {
        res.render("products/allProducts", {
          products: response,
          styles: "allProducts",
          userLogged,
        });
      })
      .catch(function (e) {
        res.render("error"); // si no  encuentra el ususario
      });
  },

  cartProducts: (req, res) => {
    db.Products.findAll()
      .then((response) => {
        res.render("products/productCart", {
          productCart: response,
          styles: "productCart",
        });
      })
      .catch(function (e) {
        res.render("error"); // si no  encuentra el ususario
      });
  },

  productDetail: async (req, res) => {
    //entramos al producto mediante req.params.id

    let userLogged = await req.session.userLogged;

    db.Products.findByPk(req.params.id)
      .then(response => {
        res.render("products/oneProduct", {
          products: response,
          styles: "oneProduct",
          userLogged,
        });
      })
      .catch(function (e) {
        res.render("error"); // si no  encuentra el ususario
      });
  },

  //VISTA DE CREAR PRODUCTO
  createProducts: async function (req, res) {
    let inventory = await db.Inventory.findAll();

    res.render(
      "products/createProducts",
      { styles: "register", inventory:inventory }
    );
  },

  storeProducts: async function (req, res) {
    const resultProductsValidation = validationResult(req);
    //console.log('resultProductsValidation', resultProductsValidation)

    if (!resultProductsValidation.errors.length) {
      await db.Products.create({
        brand: req.body.brand,
        description: req.body.description,
        image: req.file.filename,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        model: req.body.model,
        inventory_id: req.body.inventory_id || 1,
      });
      res.redirect("/products");
    } else {
      //  let productType = await db.ProductType.findAll();
      let inventory = await db.Inventory.findAll();
      // let console = await db.Console.findAll();

      return res.render("products/createProducts", {
        inventory: inventory,
        errors: resultProductsValidation.mapped(),
				oldData: req.body,
				styles: "register",
      });
    }
  },

  //VISTA DE EDITAR PRODUCTO
  editProducts: async function (req, res) {
    // let productType = await db.ProductType.findAll();
    let inventory = await db.Inventory.findAll();
    //let console = await db.Console.findAll();

    let product = await db.Products.findByPk(req.params.id);

    res.render("products/editProducts", {
      old: product,
      product: product,
      styles: "register",
    });
  },

  //EDITAR PRODUCTO POR POST!
  updateProducts: async function (req, res) {
    // res.send(req.body)
    const resultProductsValidation = validationResult(req);
    let file = req.file;
    if (!resultProductsValidation.errors.length) {
      await db.Products.update(
        {
          brand: req.body.brand,
          description: req.body.description,
          image: file ? req.file.filename : req.body.image,
          price: req.body.price,
          discount: req.body.discount,
          category: req.body.category,
          model: req.body.model,
          inventory_id: req.body.inventory_id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.redirect("/products");
    } else {
      let inventory = await db.Inventory.findAll();

      let product = await db.Products.findByPk(req.params.id);

      return res.render("products/editProducts", {
        errors: resultProductsValidation.mapped(),
        old: product,
        oldData: req.body,
        inventory: inventory,
        styles: "register",
        product: product,
      });
    }
  },

  deleteProduct: async function (req, res) {
    let product = await db.Products.findByPk(req.params.id);

    await product.destroy();

    res.redirect("/products");
  },
  productFilter: async (req, res) => {
    //Filtro de productos
    const clasificacion = req.params.category; //obtenemos la categoría del producto
    const productList = await db.Products.findAll({
      where: {
        category: clasificacion
      } 
    })

    res.render("products/allProducts", {
      //renderizamos la vista de todos los productos
      styles: "allProducts", //le pasamos el estilo correspondiente
      products: productList, //le pasamos la lista de productos filtrada
    });
  },
 
};

module.exports = productsController;
