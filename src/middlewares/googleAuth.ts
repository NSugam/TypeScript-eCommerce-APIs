const googleAuth = async (req: any, res: any, next: any) => {
    try {
        // const code = req.headers.authorization;
        const code = req.query.code;
        if (!code) return res.status(400).json({ message: 'Authorization code missing' });

        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'http://localhost:9095/api/user/profile',
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
        // res.status(200).json({ message: 'Authentication successful', user: userDetails, accessToken });

    } catch (error: any) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Authentication failed', error: error });
    }
};

const refreshGoogleToken = async (req: any, res: any) => {
    var userRefreshToken = ''
    try {
        if (!userRefreshToken) {
            return res.status(400).json({ message: 'No refresh token available' });
        }

        const response = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: userRefreshToken,
            grant_type: 'refresh_token',
        });
        const newAccessToken = response.data.access_token;

        return res.status(200).json({ message: 'Token refreshed', access_token: newAccessToken });

    } catch (error: any) {
        console.error('Failed to get token', error);
        res.status(500).json({ message: 'Failed to get token', error: error });
    }
};

require('dotenv').config();
var axios = require('axios');
import { userEntity } from "../entity/userEntity";

var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const checkAuth = async (req: any, res: any, next: any) => {
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

module.exports = { googleAuth, refreshGoogleToken };
