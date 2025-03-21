import { Router } from "express";
const router = Router();

router.use('/user', require('./user'))

router.use('/product', require('./product'))

router.use('/cart', require('./cart'))

router.use('/order', require('./order'))

export default router;
