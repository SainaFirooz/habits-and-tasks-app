import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Habits from "./pages/Habits";
import HomePage from "./pages/HomePage";
import NewHabit from "./pages/NewHabit";
import NewTask from './pages/NewTask';
import Task from './pages/Task';
import { TaskProvider } from './pages/TaskContext';


const App = () => {
  const [habits, setHabits] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("habits")) || [];
    } catch (error) {
      console.error("Error parsing habits from localStorage:", error);
      return [];
    }
  });

  const [streaks, setStreaks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("streaks")) || [];
    } catch (error) {
      console.error("Error parsing streaks from localStorage:", error);
      return [];
    }
  });
  const [topThreeHabits, setTopThreeHabits] = useState([]);

  const priorityOrder = { low: 1, medium: 2, high: 3 };

  const addHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, { ...newHabit, streak: newHabit.startStreak }]);
  };

  useEffect(() => {
    const highPriority = habits.filter((habit) => habit.priority === "high");
    const sortedHabits = highPriority.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    const topThreeHabits = sortedHabits.slice(0, 3);

    setTopThreeHabits(topThreeHabits);
  }, [habits]);

  return (
    <TaskProvider>
    <div>
      <Routes>
         <Route path="/" element={<HomePage topThreeHabits={topThreeHabits} />} />
         <Route path='/habits' element={<Habits habits={habits} setHabits={setHabits} streaks={streaks} setStreaks={setStreaks} />} />
         <Route path="/NewHabit" element={<NewHabit addHabit={addHabit} />} />
         <Route path="/NewTask" element={<NewTask/>} />
          <Route path="/tasks" element={<Task/>} />
      </Routes>
      </div>
      </TaskProvider>

  )
};

export default App;