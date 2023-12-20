import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";

const NewHabit = ({ addHabit }) => {
  const [title, setTitle] = useState("");
  const [startStreak, setStartStreak] = useState(0);
  const [priority, setPriority] = useState("low");

  const navigate = useNavigate();

  const handleStreakChange = (e) => {
    const newStreak = parseInt(e.target.value, 10);
    setStartStreak(newStreak >= 0 ? newStreak : 0);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const newHabit = { title, startStreak, priority };
    addHabit(newHabit);
    navigate("/habits");
  };

  return (
    <>
      <h1>Create a New Habit</h1>
      <Nav />
      <form onSubmit={formSubmit}>
        <div>
          <label>Titel: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Streak: </label>
          <input
            type="number"
            value={startStreak}
            onChange={handleStreakChange}
          />
        </div>
        <div>
          <label>Priority: </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div type="submit">
          <button>Create New Habit</button>
        </div>
      </form>
    </>
  );
};

export default NewHabit;
