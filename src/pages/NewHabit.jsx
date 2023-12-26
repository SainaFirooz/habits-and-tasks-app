import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../compartments/Nav";
import Footer from "../compartments/footer";

const NewHabit = ({ addHabit }) => {
  const [title, setTitle] = useState("");
  const [startStreak, setStartStreak] = useState(0);
  const [priority, setPriority] = useState("");

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
    <div> 
       <Nav />
       <div className="mt-6 flex justify-center items-center flex-col gap-8"> 
    <div className="flex justify-center items-center gap-6"> 
      
     
      <form className="flex flex-col gap-4" onSubmit={formSubmit}>
        <div className="flex gap-6">
         
          <input className="w-72 border-2 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title here and then streak below"
          />
        </div>

        <div>
          
          <input className="w-72 border-2 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
            type="number"
            value={startStreak}
            onChange={handleStreakChange}
            placeholder="0"
          />
        </div>
        <div>
          <label></label>
          <select className="w-72 border-2 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          > 
          <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div type="submit">
          <button className="px-5 py-2 bg-sky-900 text-white font-medium rounded-md">Create New Habit</button>
        </div>
      </form>
      </div>
    </div>
    </div>
  <Footer />  
  </>
  );
};

export default NewHabit;