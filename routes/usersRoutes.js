const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const uploadFile = require('../middlewares/multerUsers');
const userValidations = require ('../middlewares/userValidations.js');
const guestMiddleware = require ('../middlewares/guestMiddleware');

router.get('/register', guestMiddleware,  usersController.register);
router.post('/register',uploadFile.single('image'), userValidations, usersController.processRegister);

router.get("/login",  guestMiddleware, usersController.login);
router.post("/login", usersController.processLogin);

router.get('/profile', usersController.profile);

router.get('/logout', usersController.logout);

module.exports = router;