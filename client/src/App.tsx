import './index.css';
import { useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { SearchBar } from './components/SearchBar';

const App: React.FC = () => {
  const { tasks, error, createTask, getTasks, updateTask, deleteTask, filterTasks } = useTasks();
  const userId = '678fc66ea8791c031ed896e1'; // Cambia esto por el ID del usuario actual

  useEffect(() => {
      getTasks(userId);
  }, [getTasks, userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lista de Tareas</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <TaskForm
        createTask={(data) =>
          createTask({
            titulo: data.titulo,
            descripcion: data.descripcion,
            usuario: userId,
            completado: false,
            fechaVencimiento: data.fechaVencimiento,
            prioridad: data.prioridad,
          })
        }
      />
      <SearchBar filterTasks={filterTasks} />
      <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
};

export default App;