import { userEntity } from "../entity/userEntity";

var jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkAuthentication = async (req: any, res: any, next: any, checkAdmin = false) => {
    try {
        const token = req.cookies._CH_Test;

        if (!token) return res.status(401).json({
            message: "Please Login to Continue", success: false
        });
        const decode = jwt.verify(token, JWT_SECRET);

        const user = await userEntity.findOne({
            where: { id: decode.userId },
            select: { id: true, username: true, email: true, phone: true, role: true }
        })
        
        if (!user) return res.status(401).json({
            message: "Invalid User Credentials", success: false
        });

        if (checkAdmin && user.role !== 'admin')
            return res.status(401).json({
                message: "Unauthorised Access", success: false
            });

        req.user = user;
        next();

    } catch (error: any) {
        next(error.message)
    }
};

const Authenticated = (req: any, res: any, next: any) => checkAuthentication(req, res, next);
const CheckAdmin = (req: any, res: any, next: any) => checkAuthentication(req, res, next, true);

module.exports = { Authenticated, CheckAdmin };
