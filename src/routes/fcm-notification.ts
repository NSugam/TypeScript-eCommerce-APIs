import { Router } from "express";
import { messaging } from 'firebase-admin'
const router = Router();

//Firebase cloud messaging configuration
var admin = require("firebase-admin");
var serviceAccount = require("../../typescript-ecommerce-keys.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendNotification = async (token: any, message: any) => {
    const messages = {
        notification: {
            title: message.title,
            body: message.body,
        },
        token: token,
    };

    try {
        await messaging().send(messages)
        console.log("Notification sent successfully");
    } catch (error) {
        console.error("Error sending notification:", error);
    }
}

const sendBulkNotification = async (token: any, message: any) => {
    const tokenChunks = [];

    for (let i = 0; i < token.length; i += 2)
        tokenChunks.push(token.slice(i, i + 2))

    console.log(tokenChunks)

    const messages = {
        notification: {
            title: message.title,
            body: message.body,
        },
        tokens: tokenChunks,
    };

    try {
        await messaging().sendEachForMulticast(messages)
        console.log("Notification sent successfully")

    } catch (error) { console.error("Error sending notification:", error) }
}

router.post("/send", async (req: any, res: any, next: any) => {
    const { title, body } = req.body;
    // const token = "t1"
    const token = ["t1", "t2", "t3"]

    if (Array.isArray(token)) {
        await sendBulkNotification(token, { title, body }).then(() => {
            res.json({ success: true, message: "Notification sent!" });
        }).catch((error) => { next(error) })

    } else {
        await sendNotification(token, { title, body }).then(() => {
            res.json({ success: true, message: "Notification sent!" });
        }).catch((error) => { next(error) })
    }


});

module.exports = router;
