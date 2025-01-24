import {Task} from "../../models/taskModels.js";


export class UpdateService {
    async updateTask(id, updateData) {
        try {
            const updatedTask = await Task.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );
    
            if (!updatedTask) {
                throw new Error('Tarea no encontrada');
            }
    
            return updatedTask;
        } catch (error) {
            throw new Error('Error al actualizar la tarea: ' + error.message);
        }
    }
}
