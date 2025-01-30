import React, { useState } from 'react';
import { Task } from '../interface/Task';


interface TaskItemProps {
    task: Task;
    deleteTask: (id: string) => void;
    updateTask: (id: string, updatedData: Partial<Task>) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, updateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.titulo);

    const handleUpdate = () => {
        updateTask(task.id, { titulo: updatedTitle });
        setIsEditing(false);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            {isEditing ? (
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        className="flex-1 p-2 border rounded"
                    />
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Guardar
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    <span className="text-lg">{task.titulo}</span>
                    <div className="space-x-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};