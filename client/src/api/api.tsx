import axios from "axios";
import { TaskData } from "../interface/TaskData";
const API_BASE_URL = "http://localhost:5000/";

export const api = {
    createTask: async (taskData: TaskData) => {
        const response = await axios.post(`${API_BASE_URL}tasks`, taskData);
        return response.data;
    },
    getTasks: async (userId: string) => {
        const response = await axios.get(`${API_BASE_URL}tasks/${userId}`);
        return response.data;
    },
    updateTask: async (id: string, taskData: TaskData) => {
        const response = await axios.put(`${API_BASE_URL}tasks/${id}`, taskData);
        return response.data;
    },
    deleteTask: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}tasks/${id}`);
        return response.data;
    },
    filterTasks: async (searchTerm: string) => {
        const response = await axios.get(`${API_BASE_URL}tasks/filter/${searchTerm}`);
        return response.data;
    },
};