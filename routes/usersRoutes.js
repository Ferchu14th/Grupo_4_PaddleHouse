const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const uploadFile = require('../middlewares/multerUsers');
const userValidations = require ('../middlewares/userValidations.js');
const guestMiddleware = require ('../middlewares/guestMiddleware');
const authMiddleware = require("../middlewares/authMiddleware")

router.get('/register', guestMiddleware,  usersController.register);
router.post('/register',uploadFile.single('image'), userValidations, usersController.processRegister);

router.get("/login",  guestMiddleware, usersController.login);
router.post("/login", usersController.processLogin);

router.get('/profile', authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);

//formulario de edicion de usuario
router.get('/edit',authMiddleware, usersController.edit)
router.put('/edit', uploadFile.single("image"), userValidations, usersController.update)

module.exports = router;