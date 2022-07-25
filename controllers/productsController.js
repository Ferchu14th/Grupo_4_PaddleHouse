const { application } = require("express"); //requiero el express
const { v4: uuidv4 } = require("uuid"); //requiero el uuid
const fs = require("fs"); //requiero el fs que sirve para leer y escribir archivos
const path = require("path"); //requiero el path que sirve para crear rutas
//Tenemos un objeto literal (productList) con datos, que estamos ubicando, listando y parseando.
const productListPath = path.resolve(__dirname, "../database/products.json"); //resolvemos el path de la carpeta database
const productList = JSON.parse(fs.readFileSync(productListPath, "utf-8")); //parseamos el archivo json y lo guardamos en una variable

module.exports = {
  // Vista de todos los productos
  getAllProducts: (req, res) => { //Vista de todos los productos
    res.render("./products/allProducts", { //renderizamos la vista de todos los productos
      styles: "allProducts", //le pasamos el estilo que queremos que se muestre
      products: productList, //le pasamos el objeto productList
    });
  },
  productDetail: (req, res) => { //Vista de un producto
    let id = req.params.id; //obtenemos el id del producto
    let product = productList.find((e) => e.id == id); //buscamos el producto en la lista de productos

    res.render("./products/oneProduct", { //renderizamos la vista del producto
      styles: "oneProduct", //le pasamos el estilo correspondiente
      products: product, //le pasamos el producto
    });
  },

    // Carrito de Compras que por ahora no tocamos
    cartProducts: (req, res) => {
      res.render("products/productCart", { styles: "productCart" });
    },

  // Método x 2: Formulario de creación de productos con método GET (renderización) createProducts y 
  // POST(procesamiento) StoreProducts
  createProducts: (req, res) => { //Formulario de creación de productos
    res.render("products/createProducts", { //renderizamos la vista de creación de productos
      styles: "register", //utilizamos el estilo register para el formulario de registro
    });
  },
  storeProducts: (req, res) => { //Procesamiento de creación de productos
    let product = req.body; //req.body es un objeto que contiene todos los datos que se envían desde el formulario
    let image = req.file; //el file es el nombre de la propiedad que se le pasa al middleware multer
    let images = req.files; //array de imágenes
  
    //console.log("store image",req.file); //con console y req.file veo la imagen
    product.id = uuidv4(); //uuidv4 es una función que genera un id único

    if (image) { //si existe una imagen sola
      product.image = image.filename; //el nombre de la imagen que se subió
    } else if (images) {//si existen más de una imagen
      product.image = images.map(image => image.filename); //entonces subo el array de imágenes
    }

    //voy creando el array con push
    productList.push(product); //agregamos el producto al array

    //voy grabando en JSON
    fs.writeFileSync(productListPath, JSON.stringify(productList, null, 2)); //el null y 2 son opcionales pero mejoran la vista del JSON

    res.redirect("/products"); //redireccionamos a la vista de todos los productos
  },
  
  // Método x 2 para la modificación/edición de un producto con método GET (renderización) editproducts y PUT (procesamiento)
  editProducts: (req, res) => { //Formulario de edición de productos
    const id = req.params.id; //obtenemos el id del producto
    const product1 = productList.find((element) => element.id == id); //buscamos el producto en la lista de productos

    res.render("products/editProducts", { //renderizamos la vista de edición de productos
      styles: "register", //utilizamos el estilo register para el formulario de editar un producto
      product: product1, //le pasamos el producto
    });
  },

  updateProducts: (req, res) => { //Procesamiento de edición de productos
    let id = req.params.id; //obtenemos el id del producto
    let newProduct = req.body; //req.body es un objeto que contiene todos los datos que se envían desde el formulario

    newProduct.id = id; //le asignamos el mismo id al producto

    for (let index = 0; index < productList.length; index++) { //recorremos el array de productos
      const element = productList[index]; //guardamos el elemento actual del array
      if (element.id == id) { //si el elemento actual es el producto que queremos editar
        productList[index] = newProduct; //lo reemplazamos por el nuevo producto
      }
    }
    //hay que actualizar el archivo con fs (como hicimos con el producto) el null y el 2 es fijo para que mantenga el formato el JSON.
    fs.writeFileSync(productListPath, JSON.stringify(productList, null, 2)); //el null y 2 son opcionales pero mejoran la vista del JSON

    res.redirect("/products");//redireccionamos a la vista de todos los productos
  },

  deleteProduct: (req, res) => {//Procesamiento de eliminación de productos
    let id = req.params.id; //obtenemos el id del producto
    for (let index = 0; index < productList.length; index++) {
      const element = productList[index]; //guardamos el elemento actual del array
      if (element.id == id) { //si el elemento actual es el producto que queremos eliminar
        productList.splice(index, 1); //lo eliminamos del array
      }
    }

    fs.writeFileSync(productListPath, JSON.stringify(productList, null, 2)); //usamos fs para grabar el archivo JSON

    res.redirect("/products"); //redireccionamos a la vista de todos los productos
  },

  // Para filtrar los productos en la vista de todos los productos que se llama allProducts por categoria
  productFilter: (req, res) => { //Filtro de productos
    const clasificacion = req.params.category; //obtenemos la categoría del producto
    const nuevaLista = productList.filter((e) => e.category == clasificacion); //filtramos la lista de productos por la categoría

    res.render("products/allProducts", { //renderizamos la vista de todos los productos
      styles: "allProducts", //le pasamos el estilo correspondiente
      products: nuevaLista, //le pasamos la lista de productos filtrada
    });
  },


};
