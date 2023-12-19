import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Habits from "./pages/Habits";
import HomePage from "./pages/HomePage";
import NewHabit from "./pages/NewHabit";

const App = () => {
  const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
  const [habits, setHabits] = useState(storedHabits);
  

  return (
    <div>

    </div>
  )
}


export default App;