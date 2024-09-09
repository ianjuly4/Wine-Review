import { NavLink} from "react-router-dom"

function NavBar(){

    return(
        <nav>
            <NavLink 
            to="/" 
            className="nav-link">
                Home
            </NavLink>

            <NavLink
            to="/FormPage"
            className="nav-link">
            Add/Update
            </NavLink>

            <NavLink
            to="/ReviewPage"
            className="nav-link">
            Reviews
            </NavLink>

            <NavLink
            to="/about"
            className="nav-link">
                About
            </NavLink>
        </nav>
    )
}
export default NavBar