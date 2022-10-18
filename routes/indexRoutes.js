const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


router.get('/', indexController.intro);
router.get('/home', indexController.index);



module.exports = router;