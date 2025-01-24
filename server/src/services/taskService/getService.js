import {Task} from "../../models/taskModels.js";

//traer todas las tareas de un usuario
export class GetService {
    async getTasks(userId) {
        try {
            const tasks = await Task.find({usuario: userId});
            return tasks;
        } catch (error) {
            throw new Error('Error al obtener las tareas: ' + error.message);
        }
    }
}
