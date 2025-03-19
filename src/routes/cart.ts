var express = require("express")
var router = express.Router()

var { checkAuth } = require('../Middlewares/auth')

var { permissionMiddleware } = require('../Middlewares/permissions')

const cartController = require("../controllers/cartController");

router.get('/all', checkAuth, permissionMiddleware('read'), cartController.getCartItems)

router.post('/add', checkAuth, permissionMiddleware('add'), cartController.addToCart)

router.post('/--qty', checkAuth, permissionMiddleware('decrease'), cartController.decreaseQty)

module.exports = router;
