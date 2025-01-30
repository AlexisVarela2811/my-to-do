//server
import express from "express";
import { conexionDB } from "./config/db.js";
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js";
import { config } from "./config/config.js";
import { corsConfig } from "./middlewares/corsMiddleware.js";

const APP = express();

APP.use(corsConfig);
APP.use(express.json());
APP.use(taskRouter);
APP.use(userRouter);

conexionDB();

APP.listen(config.PORT, () => {
  console.log("Servidor corriendo en el puerto", config.PORT);
});