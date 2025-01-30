import { TaskService } from "../services/taskService/createService.js";
import { GetService } from "../services/taskService/getService.js";
import { UpdateService } from "../services/taskService/updateService.js";
import { DeleteService } from "../services/taskService/deleteService.js";
import { FilterService } from "../services/taskService/filterService.js";

// Definir constantes para los estados HTTP
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_ERROR = 500;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;
// CONST PARA TAREAS VACIAS
const NO_TASK_FOUND = 0;

export class TaskController {
  async createTask(req, res) {
    console.log("recibindo datos", req.body);
    const {
      titulo,
      descripcion,
      completado,
      fechaVencimiento,
      prioridad,
      usuario,
    } = req.body;

    // Parse the fechaVencimiento if it's a string in DD-MM-YYYY format
    let parsedFechaVencimiento;
    if (fechaVencimiento) {
      const [day, month, year] = fechaVencimiento.split("-").map(Number);
      parsedFechaVencimiento = new Date(year, month - 1, day); // Month is 0-indexed
    }

    if (!titulo || !descripcion || !usuario) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        message: "Faltan datos requeridos (titulo, descripcion, usuario).",
      });
    }
    try {
      const CREATE_SERVICE = new TaskService();
      const TASK = await CREATE_SERVICE.createTask(
        titulo,
        descripcion,
        completado ?? false,
        parsedFechaVencimiento, // Use the parsed date
        prioridad,
        usuario
      );
      return res.status(HTTP_STATUS_CREATED).json({
        message: "Tarea creada exitosamente",
        task: TASK,
      });
    } catch (error) {
      return res.status(HTTP_STATUS_ERROR).json({
        message: "Error al crear la tarea",
        error: error.message,
      });
    }
  }

  async getTasks(req, res) {
    const USER_ID = req.params.userId;
    const GET_SERVICE = new GetService();
    try {
      const TASKS = await GET_SERVICE.getTasks(USER_ID);
      if (TASKS.length === NO_TASK_FOUND) {
        return res.status(HTTP_STATUS_NOT_FOUND).json({
          message: "No se encontraron tareas para este usuario.",
          tasks: [],
        });
      }
      return res.status(HTTP_STATUS_OK).json({
        message: "Tareas obtenidas exitosamente",
        tasks: TASKS,
      });
    } catch (error) {
      return res.status(HTTP_STATUS_ERROR).json({
        message: "Error al obtener las tareas",
        error: error.message,
      });
    }
  }

  async updateTask(req, res) {
    const UPDATE_SERVICE = new UpdateService();
    const { id } = req.params;
    const UPDATE_DATA = { ...req.body }; // Usar el cuerpo de la solicitud directamente
    console.log("recibindo UPDATE_DATA", UPDATE_DATA);
    try {
      const UPDATED_TASK = await UPDATE_SERVICE.updateTask(id, UPDATE_DATA);
      if (!UPDATED_TASK) {
        return res.status(HTTP_STATUS_NOT_FOUND).json({
          message: `No se encontró tarea con el ID ${id}`,
        });
      }
      return res.status(HTTP_STATUS_OK).json({
        message: "Tarea actualizada exitosamente",
        updatedTask: UPDATED_TASK,
      });
    } catch (error) {
      return res.status(HTTP_STATUS_ERROR).json({
        message: "Error al actualizar la tarea",
        error: error.message,
      });
    }
  }

  async deleteTask(req, res) {
    const { id } = req.params;
    const DELETE_SERVICE = new DeleteService();

    try {
      const DELETED_TASK = await DELETE_SERVICE.deleteTask(id);
      if (!DELETED_TASK) {
        return res.status(HTTP_STATUS_NOT_FOUND).json({
          message: `No se encontró tarea con el ID ${id}`,
        });
      }
      return res.status(HTTP_STATUS_OK).json({
        message: "Tarea eliminada exitosamente",
        deletedTask: DELETED_TASK,
      });
    } catch (error) {
      return res.status(HTTP_STATUS_ERROR).json({
        message: "Error al eliminar la tarea",
        error: error.message,
      });
    }
  }

  async filterTasks(req, res) {
    const {searchTerm } = req.params;
    const FILTER_SERVICE = new FilterService();

    try {
      const TASKS = await FILTER_SERVICE.filterTasks(searchTerm);
      return res.status(HTTP_STATUS_OK).json({
        message: "Tareas filtradas exitosamente",
        tasks: TASKS,
      });
    } catch (error) {
      return res.status(HTTP_STATUS_ERROR).json({
        message: "Error al filtrar las tareas",
        error: error.message,
      });
    }
  }
}
