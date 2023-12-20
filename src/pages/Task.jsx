import Nav from "../compartments/Nav";
import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';

const Tasks = () => {
    const { tasks, deleteTask, toggleComplete, updateTask } = useContext(TaskContext);
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('title');
    const [isAscending, setIsAscending] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortField(e.target.value);
    };

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    const handleEdit = (id, title) => {
        setEditingId(id);
        setEditTitle(title);
    };

    const handleUpdate = () => {
        updateTask(editingId, { title: editTitle });
        setEditingId(null);
        setEditTitle('');
    };

    const filteredTasks = tasks.filter(task => 
        (filterType ? task.type === filterType : true) && !task.completed
    );

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortField === 'title') {
            return isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else if (sortField === 'estimate') {
            const estimateA = parseInt(a.estimate, 10);
            const estimateB = parseInt(b.estimate, 10);
            return isAscending ? estimateA - estimateB : estimateB - estimateA;
        }
        return 0;
    });

    const completedTasks = tasks.filter(task => task.completed);

    return (
        
        <div>
            <Nav />
            <h1>Ärenden</h1>
            <div>
                <select onChange={handleFilterChange}>
                    <option value="">Alla</option>
                    <option value="hushållssysslor">Hushållssysslor</option>
                    <option value="aktivitet med vänner">Aktivitet med vänner</option>
                    <option value="jobbrelaterad">Jobbrelaterad</option>
                </select>
                <select onChange={handleSortChange}>
                    <option value="title">Titel</option>
                    <option value="estimate">Tidsestimat</option>
                </select>
                <button onClick={toggleSortOrder}>{isAscending ? 'Stigande' : 'Fallande'}</button>
            </div>
            <div>
                <h2>Aktiva Ärenden</h2>
                {sortedTasks.map(task => (
                    <div key={task.id}>
                        {editingId === task.id ? (
                            <>
                                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                <button onClick={handleUpdate}>Spara</button>
                                <button onClick={() => setEditingId(null)}>Avbryt</button>
                            </>
                        ) : (
                            <>
                                <div onClick={() => toggleComplete(task.id)}>
                                    {task.title} - {task.estimate} - {task.completed ? 'Slutfört' : 'Ej slutfört'}
                                </div>
                                <button onClick={() => handleEdit(task.id, task.title)}>Redigera</button>
                                <button onClick={() => deleteTask(task.id)}>Ta bort</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <h2>Slutförda Ärenden</h2>
                {completedTasks.map(task => (
                    <div key={task.id}>
                        <div>
                            {task.title} - {task.estimate} - Slutfört
                        </div>
                        <button onClick={() => deleteTask(task.id)}>Ta bort</button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Tasks;
