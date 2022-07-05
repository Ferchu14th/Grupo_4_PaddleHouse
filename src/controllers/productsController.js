
module.exports = {
    detail: (req, res) => {
        res.render('../views/productDetail.html');
    },
    cart: (req, res) => {
        res.render('../views/productCart.html');
    }
}
