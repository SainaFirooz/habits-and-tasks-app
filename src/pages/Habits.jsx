import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";

const Habits = ({ habits, setHabits }) => {
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [streakSort, setStreakSort] = useState("högst till lägs");
  const [prioritySort, setPrioritySort] = useState("högst till lägs");
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

      const sortMulti = sortOrder === "högst till lägst" ? -1 : 1;

      return sortMulti * (compareValueB - compareValueA);
    });

    setFilteredHabits(sortHabits);
  };

  const handleStreakSort = () => {
    const streakOrder =
      streakSort === "högst till lägst" ? "lägst till högst" : "högst till lägst";
    setStreakSort(streakOrder);
    handleSort("streak", streakOrder);
  };

  const handlePrioritySort = () => {
    const priorityOrder =
      prioritySort === "högst till lägst"
        ? "lägst till högst"
        : "högst till lägst";
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
        <p>Inga vanor att visa. Vänligen skapa en.</p>
      ) : (
        <>
          <button onClick={() => navigate("/NewHabit")}>Skapa ny vana</button>

          <button onClick={handleStreakSort}>
            Sortera Streak ({streakSort})
          </button>

          <button onClick={handlePrioritySort}>
            Sortera Prioritet ({prioritySort})
          </button>

          <table>
            <thead>
              <tr>
                <th>Titel</th>
                <th>Prioritet</th>
                <th>Öka</th>
                <th>Streak</th>
                <th>Minska</th>
                <th>Nollställa</th>
                <th>Ta bort</th>
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
                      Nollställa
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteHabit(habit.title)}>
                      Ta bort
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={resetAllStreaks}>Nollställa alla streaks</button>
        </>
      )}
    </>
  );
};

export default Habits;
