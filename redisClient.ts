require('dotenv').config();
import { createClient } from 'redis'

if (process.env.NODE_ENV === 'production') {
    var redisUrl: any = process.env.REDIS_URL_PROD
} else {
    var redisUrl: any = process.env.REDIS_URL
}

const redisClient = createClient({ url: redisUrl })

redisClient.connect().then(() => console.log("Connected to Redis")).catch(console.error);

export { redisClient }
