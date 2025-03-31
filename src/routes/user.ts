import { Router } from "express";
const router = Router();

const userController = require('../controllers/userController')

var validator = require('express-joi-validation').createValidator({})
var validate = require('../middlewares/validate')

var { googleAuth, refreshGoogleToken } = require('../middlewares/googleAuth')

router.post('/register', userController.userRegister)

router.post('/login',validator.body(validate.loginSchema), userController.userLogin)

router.get('/profile', (req: any, res: any) => {
    return res.status(200).json({ message: "User profile details", success: true, user: req.user })
})

router.get('/googleAuth', googleAuth)
router.get('/refresh-token', refreshGoogleToken)

router.get('/logout', async (req:any, res:any) => {
    res.cookie('_CH_Test', '', {
        expires: new Date(0)
    });
    res.status(200).send({ message: "Logged out", success: true })
})

module.exports = router;