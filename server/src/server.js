//server
import express from "express";
import { conexionDB } from "./config/db.js";
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js";
import { config } from "./config/config.js";

const app = express();

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

conexionDB();

app.listen(config.PORT, () => {
  console.log("Servidor corriendo en el puerto", config.PORT);
});
