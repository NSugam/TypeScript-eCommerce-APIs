var express = require("express")
var router = express.Router()

var { checkAuth } = require('../Middlewares/auth')
var { permissionMiddleware } = require('../Middlewares/permissions')

const orderController = require("../controllers/orderController");

router.get('/all', checkAuth, permissionMiddleware(), orderController.getAllOrders)

router.post('/place', checkAuth,permissionMiddleware(), orderController.placeOrder)

router.put('/update', checkAuth,permissionMiddleware(), orderController.updateOrder)

router.delete('/delete', checkAuth,permissionMiddleware(), orderController.deleteOrder)

module.exports = router;