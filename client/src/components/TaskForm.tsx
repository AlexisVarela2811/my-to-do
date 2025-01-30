import React, { useState } from 'react';

interface TaskFormProps {
    createTask: (taskData: {
        titulo: string;
        descripcion: string;
        completado?: boolean;
        fechaVencimiento?: string;
        prioridad?: string;
        usuario: string;
    }) => void; // Define the type for createTask
}

export const TaskForm: React.FC<TaskFormProps> = ({ createTask }) => {
    const [titulo, setTitulo] = useState<string>(''); // Task title
    const [descripcion, setDescripcion] = useState<string>(''); // Task description
    const [completado, setCompletado] = useState<boolean>(false); // Task completion status
    const [fechaVencimiento, setFechaVencimiento] = useState<string>(''); // Due date
    const [prioridad, setPrioridad] = useState<string>(''); // Task priority
    const usuario = '678fc66ea8791c031ed896e1'; // Current user

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Log the task data being sent
        console.log({
            titulo,
            descripcion,
            completado,
            fechaVencimiento,
            prioridad,
            usuario
        });

        createTask({ titulo, descripcion, completado, fechaVencimiento, prioridad, usuario });
        setTitulo('');
        setDescripcion('');
        setCompletado(false);
        setFechaVencimiento('');
        setPrioridad('');
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
                    onChange={(e) => setFechaVencimiento(e.target.value)}
                    placeholder="Fecha de Vencimiento"
                    className="flex-1 p-2 border rounded"
                />
                <input
                    type="text"
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}
                    placeholder="Prioridad"
                    className="flex-1 p-2 border rounded"
                />
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