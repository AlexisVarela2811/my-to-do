import dotenv from "dotenv";

dotenv.config();

const {
    MONGODB_URI = 'mongodb://localhost:27017/ToDoList',
    JWT_SECRET = '01049db20888a6c2f3f7e2a39faaba2413e9de6e530b667e6c8a39d6704b38cb',
    PORT = 5000
} = process.env;

const config = {
    MONGODB_URI,
    JWT_SECRET,
    PORT
};

export default config; // Exportar como default