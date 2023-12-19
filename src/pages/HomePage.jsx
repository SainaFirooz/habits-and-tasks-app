import Nav from "../compartments/Nav";
import './style.css' 
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  const seeMorebtn = () => {
    navigate("/habits");
  }

  return (
    <>
    <h2>Habits & Tasks</h2>
    
    
    </>
  )
}