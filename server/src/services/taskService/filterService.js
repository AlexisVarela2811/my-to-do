import { Task } from "../../models/taskModels.js";

//filtrar tareas por todos los campos de la tabla Task

export class FilterService {
  async filterTasks(searchTerm) {
    try {
      const query = {
        $or: [
          { titulo: { $regex: searchTerm, $options: "i" } },
          { descripcion: { $regex: searchTerm, $options: "i" } },
          { prioridad: { $regex: searchTerm, $options: "i" } },
        ],
      };

      // Añadimos un filtro por fecha de vencimiento
      const parsedDate = new Date(searchTerm);
      if (!isNaN(parsedDate.getTime())) {
        query.fechaVencimiento = parsedDate;
      }
      const tasks = await Task.find(query);
      return tasks;
    } catch (error) {
      throw new Error("Error al filtrar las tareas: " + error.message);
    }
  }
}
