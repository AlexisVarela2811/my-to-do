import { Task } from "../../models/taskModels.js";

export class UpdateService {
  async updateTask(id, updateData) {
    try {
      const UPDATED_TASK = await Task.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!UPDATED_TASK) {
        throw new Error("Tarea no encontrada");
      }

      return UPDATED_TASK;
    } catch (error) {
      throw new Error("Error al actualizar la tarea: " + error.message);
    }
  }
}
