//server
import express from "express";
import dotenv from "dotenv";
import {conexionDB} from "./config/db.js";
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

conexionDB();

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto", process.env.PORT);
});