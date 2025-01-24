import { TaskService } from '../services/taskService/createService.js';
import { GetService } from '../services/taskService/getService.js';
import { UpdateService } from '../services/taskService/updateService.js';
import { DeleteService } from '../services/taskService/deleteService.js';
import { FilterService } from '../services/taskService/filterService.js';

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
        const { titulo, descripcion, completado, fechaVencimiento, prioridad, usuario } = req.body;
        if (!titulo || !descripcion || !usuario) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({
                message: 'Faltan datos requeridos (titulo, descripcion, usuario).'
            });
        }
        try {
            const createService = new TaskService();
            const task = await createService.createTask(titulo, descripcion, completado ?? false, fechaVencimiento, prioridad, usuario);
            return res.status(HTTP_STATUS_CREATED).json({
                message: 'Tarea creada exitosamente',
                task: task
            });
        } catch (error) {
            return res.status(HTTP_STATUS_ERROR).json({
                message: 'Error al crear la tarea',
                error: error.message
            });
        }
    }

    async getTasks(req, res) {
        const userId = req.params.userId;
        const getService = new GetService();
        try {
            const tasks = await getService.getTasks(userId);
            if (tasks.length === NO_TASK_FOUND) {
                return res.status(HTTP_STATUS_NOT_FOUND).json({
                    message: 'No se encontraron tareas para este usuario.',
                    tasks: []
                });
            }
            return res.status(HTTP_STATUS_OK).json({
                message: 'Tareas obtenidas exitosamente',
                tasks: tasks
            });
        } catch (error) {
            return res.status(HTTP_STATUS_ERROR).json({
                message: 'Error al obtener las tareas',
                error: error.message
            });
        }
    }

    async updateTask(req, res) {
        const updateService = new UpdateService();
        const { id } = req.params;
        const updateData = { ...req.body }; // Usar el cuerpo de la solicitud directamente
    
        try {
            const updatedTask = await updateService.updateTask(id, updateData);
            if (!updatedTask) {
                return res.status(HTTP_STATUS_NOT_FOUND).json({
                    message: `No se encontró tarea con el ID ${id}`,
                });
            }
            return res.status(HTTP_STATUS_OK).json({
                message: 'Tarea actualizada exitosamente',
                updatedTask: updatedTask
            });
        } catch (error) {
            return res.status(HTTP_STATUS_ERROR).json({
                message: 'Error al actualizar la tarea',
                error: error.message
            });
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params;
        const deleteService = new DeleteService();
    
        try {
            const deletedTask = await deleteService.deleteTask(id);
            if (!deletedTask) {
                return res.status(HTTP_STATUS_NOT_FOUND).json({
                    message: `No se encontró tarea con el ID ${id}`,
                });
            }
            return res.status(HTTP_STATUS_OK).json({
                message: 'Tarea eliminada exitosamente',
                deletedTask: deletedTask
            });
        } catch (error) {
            return res.status(HTTP_STATUS_ERROR).json({
                message: 'Error al eliminar la tarea',
                error: error.message
            });
        }
    }

    async filterTasks(req, res) {
        const { searchTerm } = req.params;
        const filterService = new FilterService();
    
        try {
            const tasks = await filterService.filterTasks(searchTerm);
            return res.status(HTTP_STATUS_OK).json({
                message: 'Tareas filtradas exitosamente',
                tasks: tasks
            });
        } catch (error) {
            return res.status(HTTP_STATUS_ERROR).json({
                message: 'Error al filtrar las tareas',
                error: error.message
            });
        }
    }
}
