import express from "express";
import db from "./App/Database.js";
import router from "./Routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

try {
    await db.authenticate();
    console.log('Database Connected.');
} catch (error) {
    console.log(error);
}

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1', router);

app.listen(7777, () => console.log('Server running at port 7777'));