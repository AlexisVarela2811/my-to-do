//configuramos la conexion a la db de mongo

import mongoose from "mongoose";
import { Task } from "../models/taskModels.js";
import { User } from "../models/userModels.js";

export const conexionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Conectada");
        //sincronizamos los modelos con la base de datos para que se creen las colecciones
        await Task.syncIndexes();
        await User.syncIndexes();
    } catch (error) {
        console.log("Hubo un error");
        console.log(error);
        process.exit(1);
    }   
};
