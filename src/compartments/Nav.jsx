import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/habits"> Habits</Link>
                </li>
                <li>
                    <Link to="/tasks"> Tasks</Link>
                </li>
                <li>
                    <Link to="/newhabit">Add New Habits </Link>
                </li>
                <li>
                    <Link to="/newtask"> Add New tasks</Link>
                </li>
            </ul>
        </nav>
        
        </>
    )
}

export default Nav;