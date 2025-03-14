var express = require("express")
var router = express.Router()

var { Authenticated } = require('../middlewares/auth')
const userController = require('../controllers/userController')

router.post('/register', userController.userRegister)

router.post('/login', userController.userLogin)

router.get('/profile', Authenticated, (req: any, res: any) => {
    return res.status(200).json({ message: "User profile details", success: true, user: req.user })
})

router.get('/logout', Authenticated, async (req:any, res:any) => {
    res.cookie('_CH_Test', '', {
        expires: new Date(0)
    });
    res.status(200).send({ message: "Logged out", success: true })
})


module.exports = router;