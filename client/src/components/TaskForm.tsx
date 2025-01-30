import React, { useState } from "react";
import { TaskData } from "../interface/TaskData"; // Import the interface
import { TaskPriority } from "../interface/TaskPriority"; // Import the enum

export const TaskForm: React.FC<{
  createTask: (taskData: TaskData) => void;
}> = ({ createTask }) => {
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [completado, setCompletado] = useState<boolean>(false);
  const [fechaVencimiento, setFechaVencimiento] = useState<string>(""); // Keep this as string
  const [prioridad, setPrioridad] = useState<TaskPriority>(TaskPriority.Media); // Use enum here
  const usuario = "678fc66ea8791c031ed896e1";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [year, month, day] = fechaVencimiento.split("-");
    const formattedDate = `${day}-${month}-${year}`; // Convert to DD-MM-YYYY

    // Log the task data before sending
    console.log({
      titulo,
      descripcion,
      completado,
      fechaVencimiento: formattedDate, // Send the date as a string
      prioridad,
      usuario,
    });

    // Call createTask with the task data
    createTask({
      titulo,
      descripcion,
      completado,
      fechaVencimiento: formattedDate, // Send the date as a string
      prioridad,
      usuario,
    });

    // Clear form fields
    setTitulo("");
    setDescripcion("");
    setCompletado(false);
    setFechaVencimiento("");
    setPrioridad(TaskPriority.Media);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          className="flex-1 p-2 border rounded"
          required
        />
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="flex-1 p-2 border rounded"
        />
        <input
          type="date"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)} // Still using string
          placeholder="Fecha de Vencimiento"
          className="flex-1 p-2 border rounded"
        />
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value as TaskPriority)} // Cast to enum
          className="flex-1 p-2 border rounded"
        >
          <option value={TaskPriority.Baja}>Baja</option>
          <option value={TaskPriority.Media}>Media</option>
          <option value={TaskPriority.Alta}>Alta</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={completado}
            onChange={(e) => setCompletado(e.target.checked)}
          />
          Completado
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};
