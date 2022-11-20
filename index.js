import express from "express";
import db from "./App/Database.js";
const app = express()

try {
    await db.authenticate();
    console.log('Database Connected.');
} catch (error) {
    console.log(error);
}

app.listen(8080, () => console.log('Server running at port 8080'));