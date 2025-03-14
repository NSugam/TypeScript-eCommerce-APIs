var express = require("express")
var router = express.Router()

var { CheckAdmin } = require('../Middlewares/auth')
const productController = require("../controllers/productController");

router.get('/all', productController.getAllProducts)

router.post('/add', CheckAdmin, productController.addProduct)

router.put('/update', CheckAdmin, productController.updateProduct)

router.delete('/delete', CheckAdmin, productController.deleteProduct)

module.exports = router;