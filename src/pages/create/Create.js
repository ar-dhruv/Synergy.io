import { useState } from "react";
//STYLES
import "./Create.css";
export default function Create() {

    //FORM FIELDS STATES
    const [name,setName] = useState("");
    const [details,setDetails] = useState("");
    const [dueDate,setDueDate] = useState("");
    const [category,setCategory] = useState("");
    const [assignedUsers,setAssignedUsers] = useState([]);

    return (
        <div className="create-form">
            <h2 className="page-title">Create a new Project</h2>
            <form>

            </form>
        </div>
    )
}

