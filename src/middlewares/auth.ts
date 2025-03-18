require('dotenv').config();
var axios = require('axios');
import { userEntity } from "../entity/userEntity";

var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const JWTAuthentication = async (req: any, res: any, next: any, checkAdmin = false) => {
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

const googleAuth = async (req: any, res: any, next:any) => {
    try {
        const code = req.headers.authorization;
        if (!code) return res.status(400).json({ message: 'Authorization code missing' });

        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'postmessage',
                grant_type: 'authorization_code'
            }
        );
        const accessToken = response.data.access_token;

        const userResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        );

        const userDetails = userResponse.data;
        req.user = userDetails;
        next();
        res.status(200).json({ message: 'Authentication successful', user: userDetails });
        
    } catch (error: any) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
};

const Authenticated = (req: any, res: any, next: any) => JWTAuthentication(req, res, next);
const CheckAdmin = (req: any, res: any, next: any) => JWTAuthentication(req, res, next, true);

module.exports = { Authenticated, CheckAdmin, googleAuth };
