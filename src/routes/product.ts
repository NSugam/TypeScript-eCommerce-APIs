var express = require("express")
var router = express.Router()
const productController = require("../controllers/productController");

var validator = require('express-joi-validation').createValidator({})
var validate = require('../middlewares/validate')

var { permissionMiddleware } = require('../Middlewares/permissions')
var { checkAuth } = require('../Middlewares/auth')

router.get('/all', productController.getAllProducts)

router.post('/add', validator.body(validate.addProductSchema),
    checkAuth, permissionMiddleware(), productController.addProduct)

router.put('/update', validator.body(validate.updateProductSchema),
    checkAuth, permissionMiddleware(), productController.updateProduct)

router.delete('/delete', validator.body(validate.deleteProductSchema),
    checkAuth, permissionMiddleware(), productController.deleteProduct)

module.exports = router;
