import { Task } from "../../models/taskModels.js";

//eliminar una tarea
export class DeleteService {
    async deleteTask(id) {
        try {
            const deletedTask = await Task.findByIdAndDelete(id);
            if (!deletedTask) {
                throw new Error('Tarea no encontrada');
            }
            return deletedTask;
        } catch (error) {
            throw new Error('Error al eliminar la tarea: ' + error.message);
        }
    }
}