import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";

//STYLES & ICONS
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hello {user.displayName}</p>
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
