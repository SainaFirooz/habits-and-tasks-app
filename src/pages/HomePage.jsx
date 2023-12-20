import Nav from "../compartments/Nav";
import "./style.css";
import { Link } from "react-router-dom";
import { TaskContext } from './TaskContext';
import React, { useContext } from 'react';

const HomePage = ({ topThreeHabits }) => {

  const { tasks } = useContext(TaskContext);

    
  const latestTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 3);


  return (
    <>
      <h2>Habits & Tasks</h2>
      <Nav />

      <div>
        <h2>Top Three Habits</h2>
        <div>
          {topThreeHabits.map((habit) => (
            <div key={habit.title}>
              <h3>{habit.title}</h3>
              <p>Priority: {habit.priority}</p>
            </div>
          ))}
          <Link to="/habits">See More Habits</Link>
        </div>
      </div>
      <div>
      <h1>Senaste Ärenden</h1>
            {latestTasks.map(task => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Tidsestimat: {task.estimate}</p>
                    <p>Typ: {task.type}</p>
                    <p>Status: {task.completed ? 'Slutfört' : 'Ej slutfört'}</p>
                </div>
            ))}
            <Link to="/tasks">Se fler ärenden</Link>
      </div>

      


    </>
  );
};

export default HomePage;