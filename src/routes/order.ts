import { Router } from "express";
const router = Router();

const orderController = require("../controllers/orderController");

router.get('/all', orderController.getAllOrders)

router.post('/place', orderController.placeOrder)

router.put('/update', orderController.updateOrder)

router.delete('/delete', orderController.deleteOrder)

module.exports = router;