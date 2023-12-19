import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";


const Habits = () => {
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [streakSort, setStreakSort] = useState("highest to lowest");
  const [prioritySort, setPrioritySort] = useState("highest to lowest");
  const priorityOrder = { low: 1, medium: 2, high: 3};


  return (
    <>
    
    </>
  );
};

export default Habits;