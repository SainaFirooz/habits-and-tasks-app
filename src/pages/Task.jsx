import Nav from "../compartments/Nav";
import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';
import Footer from "../compartments/footer";

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
        <> 

        <div>
            <Nav />
            <h1 className="w-full text-center font-semibold uppercase text-xl tracking-tight my-1 mt-6">
                Ärenden
            </h1>

            <div className="w-full text-center flex items-center flex-col gap-5">
                <div className="flex justify-center mb-5 gap-2">
                    <select className="px-5 py-2 bg-sky-900 text-white font-medium rounded-md" onChange={handleFilterChange}>
                        <option value="">Alla</option>
                        <option value="hushållssysslor">Hushållssysslor</option>
                        <option value="aktivitet med vänner">Aktivitet med vänner</option>
                        <option value="jobbrelaterad">Jobbrelaterad</option>
                    </select>
                    <select className="px-5 py-2 bg-sky-900 text-white font-medium rounded-md" onChange={handleSortChange}>
                        <option value="title">Titel</option>
                        <option value="estimate">Tidsestimat</option>
                    </select>
                    <button className="px-5 py-2 bg-sky-900 text-white font-medium rounded-md" onClick={toggleSortOrder}>
                        {isAscending ? 'Stigande' : 'Fallande'}
                    </button>
                    
                </div>

                <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
                    <h2 className="font-semibold uppercase text-lg tracking-tight">Aktiva Ärenden</h2>
                    {sortedTasks.map(task => (
                        <div key={task.id} className="mb-2">
                            {editingId === task.id ? (
                                <>
                                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                    <button onClick={handleUpdate}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                                        <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                                    </svg>


                                    </button>
                                    <button onClick={() => setEditingId(null)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                                            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                        </svg>

                                    </button>
                                </>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div onClick={() => toggleComplete(task.id)}>
                                        {task.title} - {task.estimate} -
                                        {task.completed ? 'Slutfört' :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 inline">
                                                <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                            </svg>
                                        }
                                    </div>

                                    <div>
                                        <button onClick={() => handleEdit(task.id, task.title)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                                            <path fill-rule="evenodd" d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z" clip-rule="evenodd" />
                                        </svg>


                                        </button>
                                        <button onClick={() => deleteTask(task.id)} className="focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md mt-5">
                    <h2 className="font-semibold uppercase text-lg tracking-tight">Slutförda Ärenden</h2>
                    {completedTasks.map(task => (
                        <div key={task.id} className="mb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    {task.title} - {task.estimate}
                                </div>
                                <button onClick={() => deleteTask(task.id)}>                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                                </svg>

                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer />
</>
    );
};


export default Tasks;
