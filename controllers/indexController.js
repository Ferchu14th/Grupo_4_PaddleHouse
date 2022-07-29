const fs = require("fs");
const path = require("path");
const productListPath = path.resolve(__dirname, "../database/products.json");
const productList = JSON.parse(fs.readFileSync(productListPath, "utf8"));

module.exports = {
    index: (req, res) => {
        res.render("index", {
            styles: "styles",
            products: productList,
            user: req.session.user,
        });
    },
};
