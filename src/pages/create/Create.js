import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import CreateAnimation from "../../components/CreateAnimation";

//STYLES
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const { documents } = useCollection("users");

  const [users, setUsers] = useState([]); //STATE FOR THE USER DOCUMENTS WE ARE GETTING FROM THE DATABASE FOR USING IN THE SELECT DROPDOWN OF ASSIGNED TO

  //ADD PROJECT FORM FIELDS STATES
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  //WE TAKE THE USER DOCUMENT FROM THE DATABASE & MAP IT & RETURN A OBJECT FOR EACH USER FOR THE LABEL AND THE VALUE OF THE SELECT DROPDOWN OPTIONS
  //USE EFFECT BECAUSE EVERYTIME THERE IS A CHANGE IN THE USERS USEEEFECT WILL RE-RENDER AND HENCE UPDATING THE USER THAT CAN BE ASSIGNED.
  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, details, dueDate, category.value, assignedUsers);
  };

  return (
    <>
      <CreateAnimation />
      <div className="create-form">
        <span className="page-title-create">Create a new </span>
        <span className="project-head">Project</span>
        <form onSubmit={handleSubmit}>
          <label>
          <span className = "label-span">Project name:</span>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
          <span className = "label-span">Project Details:</span>
            <textarea
            className="create-textarea"
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></textarea>
          </label>
          <label>
          <span className = "label-span">Due Date:</span>
            <input
              onfocus="(this.type='date')"
              required
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </label>

          <label>
            <span className = "label-span">Project category:</span>
            <Select
              options={categories}
              onChange={(option) => setCategory(option)}
            />
          </label>
          <label>
            <span className = "label-span">Assign to:</span>
            <Select
              options={users}
              onChange={(option) => setAssignedUsers(option)}
              isMulti
            />
          </label>

          <button className="btn">Add Project</button>
        </form>
      </div>
    </>
  );
}
