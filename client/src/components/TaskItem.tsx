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
  const [updatedDescription, setUpdatedDescription] = useState(task.descripcion);
  const [updatedCompletado, setUpdatedCompletado] = useState(task.completado);
  const [updatedPrioridad, setUpdatedPrioridad] = useState(task.prioridad);
  const [updatedFechaVencimiento, setUpdatedFechaVencimiento] = useState(
    task.fechaVencimiento ? task.fechaVencimiento.split("T")[0] : ""
  ); // Formato YYYY-MM-DD para el input de tipo date

  // Función para formatear la fecha en DD-MM-YYYY
  const formatDate = (isoDate: string | undefined): string => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Función para manejar la actualización de la tarea
  const handleUpdate = () => {
    // Convertir la fecha a formato DD-MM-YYYY
    const [year, month, day] = updatedFechaVencimiento.split("-");
    const formattedFechaVencimiento = `${day}-${month}-${year}`; // Convertir a DD-MM-YYYY
  
    updateTask(task._id, {
      titulo: updatedTitle,
      descripcion: updatedDescription,
      completado: updatedCompletado,
      fechaVencimiento: formattedFechaVencimiento, // Enviar como DD-MM-YYYY
      prioridad: updatedPrioridad,
    });
    setIsEditing(false);
  };
  
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
            type="date"
            value={updatedFechaVencimiento}
            onChange={(e) => setUpdatedFechaVencimiento(e.target.value)}
            className="p-2 border rounded"
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
          <div className="flex flex-col space-y-1">
            <span className="text-lg font-semibold">{task.titulo}</span>
            <span className="text-sm text-gray-600">{task.descripcion}</span>
            <span className="text-sm text-gray-600">
              Fecha de vencimiento: {formatDate(task.fechaVencimiento)}
            </span>
            <span className="text-sm text-gray-600">
              Prioridad: {task.prioridad}
            </span>
            <span className="text-sm text-gray-600">
              Completado: {task.completado ? "Sí" : "No"}
            </span>
          </div>
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