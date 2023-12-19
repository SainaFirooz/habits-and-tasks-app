import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Habits from "./pages/Habits";
import HomePage from "./pages/HomePage";
import NewHabit from "./pages/NewHabit";

const App = () => {
  const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
  const [habits, setHabits] = useState(storedHabits);
  const storedStreaks = JSON.parse(localStorage.getItem("streaks")) || {};
  const [streaks, setStreaks] = useState(storedHabits);
  const [topThreeHabits, setTopThreeHabits] = useState([]);
  const priorityOrder = { low: 1, medium: 2, high: 3 };

  const addHabit = (newHabit) => {
    setHabits([...habits, { ...newHabit, streak: newHabit.startStreak }]);
  };

  useEffect(() => {
    const highPriority = habits.filter((habit) => habit.priority === "high");
    
    const sortedHabits = highPriority,sort((a, b) => priorityOrder[a.priority]);
   
    const topThreeHabits = sortedHabits.slice(0, 3);

    setTopThreeHabits(topThreeHabits);
  }, [habits]);

  return (
    <div>
      <Routes>
         <Route path="/" element={<HomePage topThreeHabits={topThreeHabits} />} />
         <Route path='/habits' element={<Habits habits={habits} setHabits={setHabits} streaks={streaks} setStreaks={setStreaks} />} />
         <Route path="/NewHabit" element={<NewHabit addHabit={addHabit} />} />
      </Routes>
      </div>

  )
};

export default App;
