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

      <Nav />

      <div>

        <div className="w-full text-center flex items-center flex-col gap-5">
          <h2 className="font-semibold uppercase text-xl tracking-tight">Top Three Habits</h2>
          <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
            <div className="flex justify-between items-center mb-5">
              {topThreeHabits.map((habit) => (
                <ul className="text-sm">
                  <li className="list-none w-2/3 text-left break-normal" key={habit.title}>
                    <p className="font-bold">{habit.title}</p>
                    <p><span className="font-bold">Priority:</span> {habit.priority}</p>
                  </li>
                </ul>
              ))}
              <Link to="/habits" className="text-sm">See more habits</Link>
            </div>
          </div>
        </div>


        <div className="w-full text-center flex items-center flex-col gap-5">
          <h1 className="font-semibold uppercase text-xl tracking-tight">Latest tasks</h1>
          <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
            <div className="flex justify-between items-center mb-5">
              {latestTasks.map(task => (
                <ul className="text-sm">
                  <li className="list-none w-2/3 text-left break-normal" key={task.id}>
                    <p className="font-bold">{task.title}</p>
                    <p><span className="font-bold">Beskrivning:</span> {task.description}</p>
                    <p><span className="font-bold">Tidsestimat:</span> {task.estimate}</p>
                    <p><span className="font-bold">Typ:</span> {task.type}</p>
                    <p><span className="font-bold">Status:</span> {task.completed ? 'Slutfört' : 'Ej slutfört'}</p>
                  </li>
                </ul>
              ))}
              <Link to="/tasks" className="text-sm">See more tasks</Link>
            </div>
          </div>
        </div>

      </div>


    </>
  );
};

export default HomePage;