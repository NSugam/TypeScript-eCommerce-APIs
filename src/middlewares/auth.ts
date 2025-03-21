require('dotenv').config();
var axios = require('axios');
import { userEntity } from "../entity/userEntity";

var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const checkAuth = async (req: any, res: any, next: any) => {
    const route = req.originalUrl.replace(/^\/api\//, "").split("/");
    if (route[0] == 'user' && (route[1] == 'register' || route[1] == 'login'))
        next()

    try {
        const token = req.cookies._CH_Test;
        if (!token) return res.status(401).json({ message: "Please Login to Continue", success: false });

        const decode = jwt.verify(token, JWT_SECRET);
        const user = await userEntity.findOne({
            where: { id: decode.userId },
            select: ["id", "username", "email", "phone", "role"]
        })

        if (!user) return res.status(401).json({ message: "Invalid User Credentials", success: false });

        req.user = user;
        next();

    } catch (error: any) { next(error.message) }
};

module.exports = { checkAuth };
