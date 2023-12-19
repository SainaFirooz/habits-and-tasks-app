import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";

const Habits = ({ habits, setHabits }) => {
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [streakSort, setStreakSort] = useState("Sortera fallande");
  const [prioritySort, setPrioritySort] = useState("Sortera fallande");
  const priorityValue = { low: 1, medium: 2, high: 3 };
  const [streaks, setStreaks] = useState(
    JSON.parse(localStorage.getItem("streaks")) || {}
  );

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

      if (sortByField === "streak") {
        compareValueA = a.startStreak;
        compareValueB = b.startStreak;
      } else if (sortByField === "priority") {
        compareValueA = priorityValue[a.priority];
        compareValueB = priorityValue[b.priority];
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
      streakSort === "Sortera fallande"
        ? "Sortera stigande"
        : "Sortera fallande";
    setStreakSort(streakOrder);
    handleSort("streak", streakOrder);
  };

  const handlePrioritySort = () => {
    const priorityOrder =
      prioritySort === "Sortera fallande"
        ? "Sortera stigande"
        : "Sortera fallande";
    setPrioritySort(priorityOrder);
    handleSort("priority", priorityOrder);
  };

  const increaseStreak = (habitTitle) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.title === habitTitle
          ? { ...habit, startStreak: (habit.startStreak || 0) + 1 }
          : habit
      )
    );
  };

  const decreaseStreak = (habitTitle) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.title === habitTitle
          ? {
              ...habit,
              startStreak: habit.startStreak > 0 ? habit.startStreak - 1 : 0,
            }
          : habit
      )
    );
  };

  const resetStreak = (habitTitle) => {
    setStreaks((prevStreaks) => ({
      ...prevStreaks,
      [habitTitle]: 0,
    }));

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.title === habitTitle ? { ...habit, startStreak: 0 } : habit
      )
    );
  };

  const deleteHabit = (habitTitle) => {
    const updatedHabits = habits.filter((habit) => habit.title !== habitTitle);
    setHabits(updatedHabits);

    setStreaks((prevStreaks) => {
      const { [habitTitle]: deletedStreak, ...restStreaks } = prevStreaks;
      return restStreaks;
    });
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const resetAllStreaks = () => {
    setStreaks({});

    setHabits((prevHabits) =>
      prevHabits.map((habit) => ({
        ...habit,
        startStreak: 0,
      }))
    );
  };

  
  return <></>;
};

export default Habits;
