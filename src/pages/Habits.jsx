import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";
import Footer from "../compartments/footer";

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
      <Nav />
      <div className="w-full text-center flex items-center flex-col gap-5 mt-6">
        <h1 className="font-semibold uppercase text-xl tracking-tight my-1">
          Habits
        </h1>

        <div className="flex justify-center gap-2 mb-5">
          <button className="flex-grow px-5 py-2 bg-sky-900 text-white font-medium rounded-md" onClick={() => navigate("/NewHabit")}>Create New habit</button>
          <button className="flex-grow px-5 py-2 bg-sky-900 text-white font-medium rounded-md" onClick={handleStreakSort}>
            Sort By Streak ({streakSort})
          </button>
          <button className="flex-grow px-5 py-2 bg-sky-900 text-white font-medium rounded-md" onClick={handlePrioritySort}>
            Sort By Priority ({prioritySort})
          </button>
        </div>

        {!habits || habits.length === 0 ? (
          <p>You have no Habits. Please create one.</p>
        ) : (
          <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Increase</th>
                  <th>Streak</th>
                  <th>Decrease</th>
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
</svg>


                      </button>
                    </td>
                    <td>{habit.startStreak}</td>
                    <td>
                      <button onClick={() => decreaseStreak(habit.title)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm4-7a.75.75 0 0 0-.75-.75h-6.5a.75.75 0 0 0 0 1.5h6.5A.75.75 0 0 0 12 8Z" clip-rule="evenodd" />
</svg>


                      </button>
                    </td>
                    <td>
                      <button onClick={() => resetStreak(habit.title)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  <path d="M8.5 4.75a.75.75 0 0 0-1.107-.66l-6 3.25a.75.75 0 0 0 0 1.32l6 3.25a.75.75 0 0 0 1.107-.66V8.988l5.393 2.921A.75.75 0 0 0 15 11.25v-6.5a.75.75 0 0 0-1.107-.66L8.5 7.013V4.75Z" />
</svg>

                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteHabit(habit.title)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
</svg>

                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="flex-grow px-5 py-2 bg-sky-900 text-white font-medium rounded-md" onClick={resetAllStreaks}>Reset All Habits</button>
          </div>
        )}
      </div>
      <Footer />
    </>
    
  );
};

export default Habits;
