import {Task} from "../../models/taskModels.js";

//creamos una nueva tarea

export class TaskService {
    
    async createTask(titulo, descripcion, completado, fechaVencimiento, prioridad, usuario) {
        try {
            const newTask = new Task({
                titulo,
                descripcion,
                completado,
                fechaVencimiento,
                prioridad,
                usuario
            });
            const savedTask = await newTask.save();
            return savedTask;
        } catch (error) {
            throw new Error('Error al crear la tarea: ' + error.message);
        }
    }
}

