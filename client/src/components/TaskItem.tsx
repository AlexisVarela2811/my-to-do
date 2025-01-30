import React, { useState } from "react";
import { Task } from "../interface/Task";

interface TaskItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedData: Partial<Task>) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  deleteTask,
  updateTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.titulo);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.descripcion
  );
  const [updatedCompletado, setUpdatedCompletado] = useState(task.completado);

  // Convert ISO date string to DD-MM-YYYY format
  const formatDate = (isoDate: string | undefined): string => {
    if (!isoDate) return ""; // Si es undefined, devuelve una cadena vacía
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [updatedFechaVencimiento, setUpdatedFechaVencimiento] = useState(
    formatDate(task.fechaVencimiento) // Format the date here
  );
  const [updatedPrioridad, setUpdatedPrioridad] = useState(task.prioridad);

  const handleUpdate = () => {
    updateTask(task._id, {
      titulo: updatedTitle,
      descripcion: updatedDescription,
      completado: updatedCompletado,
      fechaVencimiento: updatedFechaVencimiento || "", // Asegúrate de que sea una cadena
      prioridad: updatedPrioridad,
    });
    setIsEditing(false);
  };

  console.log("Task data:", task); // Log the entire task object
  console.log("Due date:", task.fechaVencimiento); // Log the due date specifically

  console.log("Updating task with data:", {
    titulo: updatedTitle,
    descripcion: updatedDescription,
    completado: updatedCompletado,
    fechaVencimiento: updatedFechaVencimiento,
    prioridad: updatedPrioridad,
  });
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="p-2 border rounded"
            placeholder="Título"
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="p-2 border rounded"
            placeholder="Descripción"
          />
          <input
            type="text" // Cambia esto a texto para permitir el formato DD-MM-YYYY
            value={updatedFechaVencimiento}
            onChange={(e) => setUpdatedFechaVencimiento(e.target.value)}
            className="p-2 border rounded"
            placeholder="Fecha de Vencimiento (DD-MM-YYYY)"
          />
          <select
            value={updatedPrioridad}
            onChange={(e) => setUpdatedPrioridad(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={updatedCompletado}
              onChange={(e) => setUpdatedCompletado(e.target.checked)}
            />
            Completado
          </label>
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
              onClick={() => deleteTask(task._id)}
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
