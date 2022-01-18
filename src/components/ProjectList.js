//STYLES
import "./ProjectList.css";
export default function ProjectList({ projects }) {
  return (
    <div>
      {projects.length === 0 && <p>No Projects to display</p>}
      {projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}
