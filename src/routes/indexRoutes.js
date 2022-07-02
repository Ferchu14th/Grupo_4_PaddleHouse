const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);
/*router.get("/", (req, res) => {
    res.sendFile(__dirname + '/src/views/index.html');
})*/

module.exports = router;