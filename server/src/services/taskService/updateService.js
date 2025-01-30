import { Task } from "../../models/taskModels.js";

export class UpdateService {
  async updateTask(id, updateData) {
    // Parse the fechaVencimiento if it's in DD-MM-YYYY format
    if (updateData.fechaVencimiento) {
      const [day, month, year] = updateData.fechaVencimiento
        .split("-")
        .map(Number);
      updateData.fechaVencimiento = new Date(year, month - 1, day); // Month is 0-indexed
    }

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