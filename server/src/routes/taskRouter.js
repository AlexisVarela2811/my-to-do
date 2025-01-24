import express from 'express';
import {TaskController} from '../controller/taskController.js';

const router = express.Router();
const taskController = new TaskController();

// Ruta para crear una nueva tarea
router.post('/tasks', taskController.createTask);

// Ruta para obtener todas las tareas de un usuario
router.get('/tasks/:userId', taskController.getTasks);

// Ruta para actualizar una tarea
router.put('/tasks/:id', taskController.updateTask);

// Ruta para eliminar una tarea
router.delete('/tasks/:id', taskController.deleteTask);

// Ruta para filtrar tareas
router.get('/tasks/filter/:searchTerm', taskController.filterTasks);

export default router;