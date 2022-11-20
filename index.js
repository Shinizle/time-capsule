import express from "express";
import db from "./App/Database.js";
import router from "./Routes/index.js";
const app = express()

try {
    await db.authenticate();
    console.log('Database Connected.');
} catch (error) {
    console.log(error);
}

app.use(express.json());
app.use('/api/v1', router);

app.listen(5000, () => console.log('Server running at port 5000'));