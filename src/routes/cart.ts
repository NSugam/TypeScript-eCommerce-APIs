var express = require("express")
var router = express.Router()

var { Authenticated, CheckAdmin } = require('../Middlewares/auth')

const cartController = require("../controllers/cartController");

router.get('/all', Authenticated, cartController.getCartItems)

router.post('/add', Authenticated, cartController.addToCart)

router.post('/--qty', Authenticated, cartController.decreaseQty)

module.exports = router;
