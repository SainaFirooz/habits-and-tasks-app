import { Link } from "react-router-dom";
import "./Nav.css";
const Nav = () => {
    return (

        <>

            <nav class="flex items-center justify-between flex-wrap bg-sky-900 p-6">
                <div class="flex items-center flex-shrink-0 text-white mr-6">
                <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4" to="/"><span class="font-semibold text-xl tracking-tight">Habits & Tasks</span></Link>
                </div>
                <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-sm lg:flex-grow">
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4" to="/habits"> Habits</Link>
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4" to="/tasks"> Tasks</Link>
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4" to="/newhabit">Add new habits </Link>
                        <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4" to="/newtask"> Add new tasks</Link>

                    </div>

                </div>
            </nav>

        </>
    )
}

export default Nav;