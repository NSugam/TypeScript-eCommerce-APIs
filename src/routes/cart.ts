import { Router } from "express";
const router = Router();

const cartController = require("../controllers/cartController");

router.get('/all', cartController.getCartItems)

router.post('/add', cartController.addToCart)

router.put('/--qty', cartController.decreaseQty)

module.exports = router;
