var express = require("express")
var router = express.Router()

var { Authenticated, CheckAdmin } = require('../Middlewares/auth')

const orderController = require("../controllers/orderController");

router.get('/all', Authenticated, orderController.getAllOrders)

router.post('/place', Authenticated, orderController.placeOrder)

router.put('/update', orderController.updateOrder)

router.delete('/delete', CheckAdmin, orderController.deleteOrder)

module.exports = router;