import { Router } from "express";
const router = Router();

const productController = require("../controllers/productController");

var validator = require('express-joi-validation').createValidator({})
var validate = require('../middlewares/validate')

router.get('/all', productController.getAllProducts)

router.post('/add', validator.body(validate.addProductSchema), productController.addProduct)

router.put('/update', validator.body(validate.updateProductSchema), productController.updateProduct)

router.delete('/delete', validator.body(validate.deleteProductSchema), productController.deleteProduct)

module.exports = router;
