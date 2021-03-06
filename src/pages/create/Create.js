import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import Animation from "../../components/Animation";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFireStore";
import { useHistory } from "react-router-dom";

//STYLES
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users");

  const [users, setUsers] = useState([]); //STATE FOR THE USER DOCUMENTS WE ARE GETTING FROM THE DATABASE FOR USING IN THE SELECT DROPDOWN OF ASSIGNED TO
  const { user } = useAuthContext();

  //ADD PROJECT FORM FIELDS STATES
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  //ERROR STATE
  const [formError, setFormError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a Project Category");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to atleast 1 user");
      return;
    }

    //CREATED-BY OBJECT
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    //ASSIGNED USERS OBJECT
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    //NEW PROJECT OBJECT TO BE SAVED IN THE FIREBASE COLLECTION
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };

  return (
    <>
      <Animation />
      <div className="create-form">
        <span className="page-title-create">Create a new </span>
        <span className="project-head">Project</span>
        <form onSubmit={handleSubmit}>
          <label>
            <span className="label-span">Project name:</span>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <span className="label-span">Project Details:</span>
            <textarea
              className="create-textarea"
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></textarea>
          </label>
          <label>
            <span className="label-span">Due Date:</span>
            <input
              onfocus="(this.type='date')"
              required
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </label>

          <label>
            <span className="label-span">Project category:</span>
            <Select
              options={categories}
              onChange={(option) => setCategory(option)}
            />
          </label>
          <label>
            <span className="label-span">Assign to:</span>
            <Select
              options={users}
              onChange={(option) => setAssignedUsers(option)}
              isMulti
            />
          </label>

          <button className="btn">Add Project</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </>
  );
}
