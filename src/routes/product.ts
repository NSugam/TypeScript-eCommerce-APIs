var express = require("express")
var router = express.Router()

var validator = require('express-joi-validation').createValidator({})
var validate = require('../middlewares/validate')

var { CheckAdmin } = require('../Middlewares/auth')
const productController = require("../controllers/productController");

router.get('/all', productController.getAllProducts)

router.post('/add', validator.body(validate.addProductSchema), CheckAdmin, productController.addProduct)

router.put('/update',validator.body(validate.updateProductSchema), CheckAdmin, productController.updateProduct)

router.delete('/delete',validator.body(validate.updateProductSchema), CheckAdmin, productController.deleteProduct)

module.exports = router;