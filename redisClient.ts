require('dotenv').config();
import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL;
const redisClient = createClient({ url: redisUrl })

redisClient.connect().then(() => console.log("Connected to Redis")).catch(console.error);

export { redisClient }
