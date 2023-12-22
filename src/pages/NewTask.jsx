import Nav from "../compartments/Nav";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TaskContext } from './TaskContext';

const NewTask = () => {
    const { addTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimate, setEstimate] = useState('');
    const [type, setType] = useState('');

    const fetchActivity = async () => {
        try {
            const response = await axios.get('https://www.boredapi.com/api/activity');
            setTitle(response.data.activity);
        } catch (error) {
            console.error('Error fetching activity', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, description, estimate, type });
        setTitle('');
        setDescription('');
        setEstimate('');
        setType('');
    };

    return (
<div> 
    <Nav />
    <div className="mt-6 flex justify-center items-center flex-col gap-8"> 
        <div className="flex justify-center items-center gap-6"> 
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-6">
                    <input className="w-72 border-2 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titel"
                    />
                    <textarea className="w-72 border-2 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Beskrivning"
                    />
                    <input className="w-72 border-2 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                        type="text"
                        value={estimate}
                        onChange={(e) => setEstimate(e.target.value)}
                        placeholder="Tidsestimat"
                    />
                    <select value={type} onChange={(e) => setType(e.target.value)} className="w-72 border-2 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg">
                        <option value="">Välj typ av ärende</option>
                        <option value="hushållssysslor">Hushållssysslor</option>
                        <option value="aktivitet med vänner">Aktivitet med vänner</option>
                        <option value="jobbrelaterad">Jobbrelaterad</option>
                    </select>
                </div>
                <div className="flex gap-4 justify-center w-72">
                    <button className="flex-grow px-5 py-2 bg-sky-900 text-white font-medium rounded-md" type="button" onClick={fetchActivity}>Hämta förslag på aktivitet</button>
                    <button className="flex-grow px-5 py-2 bg-sky-900 text-white font-medium rounded-md" type="submit">Skapa ärende</button>
                </div>
            </form>
        </div>
    </div>
</div>
    );
};

export default NewTask;