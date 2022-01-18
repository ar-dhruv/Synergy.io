import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";

//STYLES
import "./Dashboard.css";
export default function Dashboard() {
  const { documents, error } = useCollection("projects");

  return (
    <div>
      <h2 className="dashboard-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects = {documents}/>}
    </div>
  );
}
