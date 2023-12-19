import Nav from "../compartments/Nav";
import "./style.css";
import { Link } from "react-router-dom";

const HomePage = ({ topThreeHabits }) => {



  return (
    <>
      <h2>Habits & Tasks</h2>
      <Nav />

      <div>
        <h2>Topp Tre Vanor</h2>
        <div>
          {topThreeHabits.map((habit) => (
            <div key={habit.title}>
              <h3>{habit.title}</h3>
              <p>Prioritet{habit.priority}</p>
            </div>
          ))}
          <Link to="/habits">Se fler vanor</Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;