require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser');
import routes from './src/routes';
const PORT = process.env.PORT

const errorMiddleware = require('./src/middlewares/errorMiddleware')
const { permissionMiddleware } = require('./src/middlewares/permissions')
const { checkAuth } = require('./src/middlewares/checkAuth')

//DB Initialization
import { AppDataSource } from "./src/data-source";
AppDataSource.initialize()

//Middlewares
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser())
app.use(checkAuth, permissionMiddleware())

app.listen(PORT, async () => {
    console.log(`\nServer Running OK @ ${PORT}...`)
});

// all routes from routes/index.ts
app.use('/api', routes);

// global error handler
app.use(errorMiddleware)