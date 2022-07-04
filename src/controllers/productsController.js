const path = require('path');

module.exports = {
    detail: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/productDetail.html'));
    },
    cart: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/productCart.html'));
    }
}
