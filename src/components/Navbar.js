import { Link } from "react-router-dom";

//STYLES & LOGOS
import "./Navbar.css";
import Molecular from "../assets/molecular.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Molecular} alt="Synergy Logo" />
          <span>Synergy</span>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
            <button className="btn">Logout</button>
        </li>
      </ul>
    </div>
  );
}
