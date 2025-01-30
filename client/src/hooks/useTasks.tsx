import { useState, useCallback } from "react";
import { api } from "../api/api";
import { Task } from "../interface/Task";
import { TaskData } from "../interface/TaskData";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Create Task
  const createTask = async (taskData: TaskData) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Get Tasks
  const getTasks = useCallback(async (userId: string) => {
    try {
      const fetchedTasks = await api.getTasks(userId);
      setTasks(fetchedTasks.tasks);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []); 

  // Update Task
  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const updatedTask = await api.updateTask(id, taskData as TaskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? updatedTask.updatedTask : task
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Delete Task
  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Filter Tasks
  const filterTasks = async (searchTerm: string) => {
    try {
      const filteredTasks = await api.filterTasks(searchTerm);
      setTasks(filteredTasks.tasks);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return {
    tasks,
    error,
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    filterTasks,
  };
};