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
            to="/review"
            className="nav-link">
                Reviews
            </NavLink>
        </nav>
    )
}
export default NavBar