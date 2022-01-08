import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

//STYLES & LOGOS
import "./Navbar.css";
import Molecular from "../assets/molecular.png";

export default function Navbar() {
  const { logout, isPending } = useLogout();

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
          {!isPending && <button className="btn" onClick={logout}>Logout</button>}
          {isPending && <button className="btn" onClick={logout}>Logging out...</button>}
        </li>
      </ul>
    </div>
  );
}
