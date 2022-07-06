const { application } = require("express");

module.exports = {
    detail: (req, res) => {
        res.render('productDetail');
    },
    cart: (req, res) => {
        res.render('productCart');
    }
}

