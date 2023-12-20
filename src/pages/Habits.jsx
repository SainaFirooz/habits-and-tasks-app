import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";

const Habits = ({ habits, setHabits }) => {
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [streakSort, setStreakSort] = useState("highest to lowest");
  const [prioritySort, setPrioritySort] = useState("highest to lowest");
  const priorityValue = { low: 1, medium: 2, high: 3 };
  const [streaks, setStreaks] = useState(
    JSON.parse(localStorage.getItem("streaks")) || {}
  );

  const navigate = useNavigate();

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

      const sortMulti = sortOrder === "highest to lowest" ? -1 : 1;

      return sortMulti * (compareValueB - compareValueA);
    });

    setFilteredHabits(sortHabits);
  };

  const handleStreakSort = () => {
    const streakOrder =
      streakSort === "highest to lowest" ? "lowest to highest" : "highest to lowest";
    setStreakSort(streakOrder);
    handleSort("streak", streakOrder);
  };

  const handlePrioritySort = () => {
    const priorityOrder =
      prioritySort === "highest to lowest"
        ? "lowest to highest"
        : "highest to lowest";
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

  return (
    <>
      <h1>Mina Vanor</h1>
      <Nav />
      {!habits || habits.length === 0 ? (
        <p>You have no Habits. Please create one.</p>
      ) : (
        <>
          <button onClick={() => navigate("/NewHabit")}>Create New habit</button>

          <button onClick={handleStreakSort}>
            Sort By Streak ({streakSort})
          </button>

          <button onClick={handlePrioritySort}>
            Sort By Priority ({prioritySort})
          </button>

          <table>
            <thead>
              <tr>
                <th>Title </th>
                <th>Priority </th>
                <th>Increase </th>
                <th>Streak </th>
                <th>Decrease </th>
                <th>Reset</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredHabits.map((habit) => (
                <tr key={habit.title}>
                  <td>{habit.title}</td>
                  <td>{habit.priority}</td>
                  <td>
                    <button onClick={() => increaseStreak(habit.title)}>
                      +
                    </button>
                  </td>
                  <td>{habit.startStreak}</td>
                  <td>
                    <button onClick={() => decreaseStreak(habit.title)}>
                      -
                    </button>
                  </td>
                  <td>
                    <button onClick={() => resetStreak(habit.title)}>
                      Reset
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteHabit(habit.title)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={resetAllStreaks}>Reset All Habits</button>
        </>
      )}
    </>
  );
};

export default Habits;
