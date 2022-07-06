const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/log', usersController.login);

router.get('/reg', usersController.register);

module.exports = router;