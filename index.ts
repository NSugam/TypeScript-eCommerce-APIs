import { AppDataSource } from "./src/data-source";

require('dotenv').config();
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT
const app = express()

const errorMiddleware = require('./src/middlewares/errorMiddleware')

//DB Initialization
AppDataSource.initialize()

//Middlewares
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser())


app.listen(PORT, async () => {
    console.log(`\nServer Running OK @ ${PORT}...`)
});

//for Users
app.use('/api/user', require('./src/routes/user'))

//for Product
app.use('/api/product', require('./src/routes/product'))

//for Cart
app.use('/api/cart', require('./src/routes/cart'))

//for Order
app.use('/api/order', require('./src/routes/order'))

// global error handler
app.use(errorMiddleware)


