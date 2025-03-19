var express = require("express")
var router = express.Router()

var { checkAuth } = require('../Middlewares/auth')
var { permissionMiddleware } = require('../Middlewares/permissions')

const orderController = require("../controllers/orderController");

router.get('/all', checkAuth, permissionMiddleware('read'), orderController.getAllOrders)

router.post('/place', checkAuth,permissionMiddleware('place'), orderController.placeOrder)

router.put('/update', checkAuth,permissionMiddleware('update'), orderController.updateOrder)

router.delete('/delete', checkAuth,permissionMiddleware('delete'), orderController.deleteOrder)

module.exports = router;