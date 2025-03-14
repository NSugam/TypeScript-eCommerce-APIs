const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
import { userEntity } from "../entity/userEntity";

exports.userRegister = async (req: any, res: any, next: any) => {
    const { username, phone, email, password, role } = req.body;

    const checkUser = await userEntity.findOne({ where: { username:username } })
    const checkEmail = await userEntity.findOne({ where: { email:email } })

    if (checkEmail || checkUser) {
        return res.status(409).json({ message: "Account already exist", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt)
    userEntity.create({
        username: username,
        email: email,
        phone: phone,
        password: secPass,
        role: role
    }).save()
    res.status(200).json({ message: "Account Created", success: true })

}

exports.userLogin = async (req: any, res: any, next: any) => {
    const { email, password } = req.body;

    const user = await userEntity.findOne({ where: { email:email } })
    if (!user) return res.status(401).send({ message: "Invalid Credentials", success: false })

    const checkPass = await bcrypt.compare(password, user.password)
    if (!checkPass) return res.status(401).send({ message: "Invalid Credentials", success: false })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('_CH_Test', token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 60 * 60 * 1000), //1hr
    });

    res.status(200).json({ message: "Login Success", success: true })
}