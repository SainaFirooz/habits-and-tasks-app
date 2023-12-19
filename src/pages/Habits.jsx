import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";


const Habits = ({ habits, setHabits}) => {
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [streakSort, setStreakSort] = useState("Sortera fallande");
  const [prioritySort, setPrioritySort] = useState("Sortera fallande");
  const priorityOrder = { low: 1, medium: 2, high: 3};
  const [streaks, setStreaks] = useState(JSON.parse(localStorage.getItem("streaks")) || {});
  
  useEffect(() => {
    setFilteredHabits(habits);
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("streaks", JSON.stringify(streaks));
  }, [habits, streaks]);


  const handleSort = (sortByField, sortOrder) => {
    const sortHabits = [...filteredHabits].sort((a, b) => {
      let compareValueA, compareValueB;

      if(sortByField === "streak") {
        compareValueA = a.startStreak;
        compareValueB = b.startStreak;
      } else if (sortByField === "priority") {
        compareValueA = priorityOrder[a.priority];
        compareValueB = priorityOrder[b.priority];
      } else {
        compareValueA = a.startStreak;
        compareValueB = b.startStreak;
      }

      const sortMulti = sortOrder === "Sortera fallande" ? -1 : 1;

      return sortMulti * (compareValueB - compareValueA);
    });

    setFilteredHabits(sortHabits);
  };

  const handleStreakSort = () => {
    const streakOrder = 
      streakSort === "Sortera fallande" ? "Sortera stigande" : "Sortera fallande";
    setStreakSort(streakOrder);
    handleSort("streak", streakOrder);
  };





  return (
    <>
    
    </>
  );
};

export default Habits;