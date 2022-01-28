import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

//STYLES
import "./Dashboard.css";
export default function Dashboard() {
  const { user } = useAuthContext();

  const { documents, error } = useCollection("projects");

  //THE FILTER FUNCTIONALITY WORKS AS...WHENEVER THE USER CLICKS ON ANY FILTER BUTTON THE CURRENTFILTER STATE VALUE CHANGES & THUS THE DASHBOARD COMPONENT IS RE-RENDERED & THE FILTER METHOD SHOWS PROJECTLIST WITH ONLY FILTERED PROJECTS
  const [currentFilter, setCurrentFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;

          case "development":
          case "design":
          case "sales":
          case "marketing":
            console.log(document.category, currentFilter);
            return document.category === currentFilter;

          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="dashboard-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
