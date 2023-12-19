import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";

const NewHabit = () => {
  const [title, setTitle] = useState("");
  const [startStreak, setStartStreak] = useState(0);
  const [priority, setPriority] = useState("low");



  return (
    <>
    <h1>Lägg till en ny vana</h1>
    <Nav/>

    </>

  )

};

export default NewHabit;

