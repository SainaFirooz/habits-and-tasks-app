import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";

const NewHabit = ({ addHabit }) => {
  const [title, setTitle] = useState("");
  const [startStreak, setStartStreak] = useState(0);
  const [priority, setPriority] = useState("low");

  
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
    <h1>Lägg till en ny vana</h1>
    <Nav/>

    </>

  )

};

export default NewHabit;

