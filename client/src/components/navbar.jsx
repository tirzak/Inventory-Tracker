
import { Link } from "react-router-dom"
const Navbar=()=>{
   return (
    <nav>
        <ul>
            <li>
                <Link to="/"> Home
                </Link>
            </li>

            <li>
                <Link to="/itemview"> Add Item
                </Link>
            </li>
            <li>
                <Link to="/group"> Add Collection
                </Link>
            </li>
        </ul>

    </nav>
)

}
export default Navbar;