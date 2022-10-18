const db = require("../../database/models");
const sequelize = db.sequelize;

const productsApiController = {
    list: (req, res) => {
        db.Products.findAll()
            .then((products) => {
                let paletas = products.filter(
                    (product) => product.category == "PALETA"
                );
                let accesorios = products.filter(
                    (product) => product.category == "ACCESORIOS"
                );
                let bolsos = products.filter(
                    (product) => product.category == "BOLSOS-PALETERO"
                );
                let categorias = ["PALETA", "ACCESORIOS", "BOLSOS-PALETERO"];
                let respuesta = {
                    count: {
                        status: 200,
                        total: products.length,
                        totalPaletas: paletas.length,
                        totalBolsos: bolsos.length,
                        totalAccesorios: accesorios.length,
                        totalCategorias: categorias.length,

                        url: "/api/products",
                        countByCategory: [
                            { paletas: paletas.length },
                            { accesorios: accesorios.length },
                            { bolsos: bolsos.length },
                        ],
                    },
                    data: products.map((product) => {
                        return {
                            id: product.id,
                            category: product.category,
                            brand: product.brand,
                            description: product.description,
                            image: "/images/uploads/" + product.image,
                            price: product.price,
                            model: product.model,
                            detail: "/api/products/" + product.id,
                        };
                    }),
                };

                res.json(respuesta);
            })

            .catch(function (error) {
                res.json({ status: 800 });
            });
    },

    detail: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then((products) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: "/api/products/" + products.id,
                    },
                    data: {
                        id: products.id,
                        category: products.category,
                        brand: products.brand,
                        description: products.description,
                        image: "/images/uploads/" + products.image,
                        price: products.price,
                        model: products.model,
                    },
                };

                res.json(respuesta);
            })

            .catch(function (error) {
                res.json({ status: 800 });
            });
    },
};

module.exports = productsApiController;
