import express from "express";
import db from "./App/Database.js";
import router from "./Routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import releaseCapsules from "./App/Schedulers/ReleaseCapsuleScheduler.js";
import cron from "node-cron";

const app = express()
dotenv.config()

try {
    await db.authenticate();
    console.log('Database Connected.');
} catch (error) {
    console.log(error);
}

cron.schedule("*/15 * * * * *", releaseCapsules);

app.use('/storage', express.static('storage'));
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1', router);

app.listen(7777, () => console.log('Server running at port 7777'));