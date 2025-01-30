import React from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../interface/Task';


interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: string) => void;
    updateTask: (id: string, updatedData: Partial<Task>) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, updateTask }) => {
    return (
        <div className="space-y-4">
            {tasks.map((task, index) => (
                <TaskItem
                key={`${task.id}-${index}`}
                    task={task}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                />
            ))}
        </div>
    );
};