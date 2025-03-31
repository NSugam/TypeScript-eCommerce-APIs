require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser');
import routes from './src/routes';
const PORT = process.env.PORT

//Middleware Imports
const errorMiddleware = require('./src/middlewares/errorMiddleware')
const { permissionMiddleware } = require('./src/middlewares/permissions')
const { checkAuth } = require('./src/middlewares/auth')

//DB Initialization
import { AppDataSource } from "./src/data-source";
AppDataSource.initialize().then(() => console.log("Connected to Postgres")).catch(console.error);

//Middlewares
app.use(express.json())
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://192.168.10.140:9095'] }));
app.use(cookieParser())
app.use(checkAuth, permissionMiddleware())

app.listen(PORT, "0.0.0.0", () => {
    console.log(process.env.NODE_ENV, `Server Running OK @ ${PORT}...`);
});


// all routes from routes/index.ts
app.use('/api', routes);

// global error handler
app.use(errorMiddleware)

export default app;
