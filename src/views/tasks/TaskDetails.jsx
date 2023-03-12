import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    const taskRef = doc(db, "tasks", id);

    getDoc(taskRef).then((response) => {
      setTask(response.data());

      let newAssignee = response.data().assignee;

      const assigneeRef = doc(db, "employees", newAssignee);

      getDoc(assigneeRef).then((res) => {
        setAssignee(res.data().full_name)
      });
    });
  }, [id]);

  return (
    <div className="task-details">
      <h1>TaskDetails</h1>
      {task && (
        <div className="box">
          <div><span>Title:</span> {task.title}</div>
          <div><span>Description:</span> {task.description}</div>
          <div><span>Assignee:</span> {assignee}</div>
          <div><span>Due date:</span> {task.due_date}</div>
        </div>
      )}
    </div>
  );
}

export default TaskDetails;
