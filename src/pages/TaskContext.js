import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = task => {
        setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    };

    const updateTask = (id, updatedTask) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
    };

    const deleteTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = id => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleComplete }}>
            {children}
        </TaskContext.Provider>
    );
};