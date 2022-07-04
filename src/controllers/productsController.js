module.exports = {
    detail: (req, res) => {
        res.sendFile(__dirname + '/src/views/productDetail.html');
    },
    cart: (req, res) => {
        res.sendFile(__dirname + '/src/views/productCart.html');
    }
}
