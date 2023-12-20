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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titel"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beskrivning"
            />
            <input
                type="text"
                value={estimate}
                onChange={(e) => setEstimate(e.target.value)}
                placeholder="Tidsestimat"
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Välj typ av ärende</option>
                <option value="hushållssysslor">Hushållssysslor</option>
                <option value="aktivitet med vänner">Aktivitet med vänner</option>
                <option value="jobbrelaterad">Jobbrelaterad</option>
            </select>
            <button type="button" onClick={fetchActivity}>Hämta förslag på aktivitet</button>
            <button type="submit">Skapa ärende</button>
        </form>
        </div>
    );
};

export default NewTask;