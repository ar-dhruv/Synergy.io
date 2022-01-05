import { NavLink } from "react-router-dom";

//STYLES & ICONS
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {/* PROFILE PICTURE & USERNAME HERE */}
          <p>Hello, Mate</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard-icon" />
                <span>Dashboard</span>
              </NavLink>
              {/* WE USE NAVLINK INSTEAD OF LINK BECAUSE NAVLINK GIVES ACTIVE CLASS TO THE SELECTED LINK SO WE CAN USE IT TO STYLE IT  */}
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add-icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
