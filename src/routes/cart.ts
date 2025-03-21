var express = require("express")
var router = express.Router()

var { checkAuth } = require('../Middlewares/auth')

var { permissionMiddleware } = require('../Middlewares/permissions')

const cartController = require("../controllers/cartController");

router.get('/all', checkAuth, permissionMiddleware(), cartController.getCartItems)

router.post('/add', checkAuth, permissionMiddleware(), cartController.addToCart)

router.put('/--qty', checkAuth, permissionMiddleware(), cartController.decreaseQty)

module.exports = router;
