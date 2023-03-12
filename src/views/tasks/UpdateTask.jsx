import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

function UpdateTask() {
  const { id = "" } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    due_date: "",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const taskRef = doc(db, "tasks", id);
    getDoc(taskRef)
      .then((res) => {
        const { title = '', description = '', assignee = '', due_date = '' } = res.data();

        setTask({
          title,
          description,
          assignee,
          due_date,
        });
      })
      .catch((err) => alert("Error getting task."));
  }, [id]);

  useEffect(() => {
    const collectionEmployees = collection(db, "employees");
    getDocs(collectionEmployees)
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          let employeesArr = [];

          snapshot.docs.forEach((doc) => {
            employeesArr.push({ ...doc.data(), id: doc.id });
          });

          setEmployees(employeesArr);
        }
      })
      .catch((err) => alert("Error getting collection of employees."));
  }, []);

  const updateTask = (e) => {
    e.preventDefault();
    if (task.assignee === "" || task.assignee === "0") {
      alert("Please select an employee.");
    } else if (task.title === "") {
      alert("Please fill title.");
    } else if (task.description === "") {
      alert("Please fill description.");
    } else {
      const taskRef = doc(db, "tasks", id);

      updateDoc(taskRef, task)
        .then(() => alert("Successfully updated task."))
        .catch((err) => alert("Error updating task."));
    }
  };
  return (
    <div>
      <h1>UpdateTask</h1>
      <form className="form box" onSubmit={(e) => updateTask(e)}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          required
          value={task.title}
          onChange={(e) => {
            setTask({ ...task, title: e.target.value });
          }}
        />
        <br />
        <br />
        <label htmlFor="description">Description: </label>
        <br />
        <textarea
          id="description"
          required
          value={task.description}
          onChange={(e) => {
            setTask({ ...task, description: e.target.value });
          }}
        />
        <br />
        <br />
        <label htmlFor="assignee">Assignee: </label>
        <select
          id="assignee"
          required
          value={task.assignee}
          onChange={(e) => {
            e.target.value !== "0" &&
              setTask({ ...task, assignee: e.target.value });
          }}
        >
          <option value="0">Select an employee</option>
          {employees.length !== 0 ? (
            employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))
          ) : (
            <option disabled>
              I can not find any employee. Please create one!
            </option>
          )}
        </select>
        <br />
        <br />
        <label htmlFor="due-date">Due date: </label>
        <input
          type="date"
          id="due-date"
          required
          value={task.due_date}
          onChange={(e) => {
            setTask({ ...task, due_date: e.target.value });
          }}
        />
        <br />
        <br />
        <br />
        <input className="button" type="submit" />
      </form>
    </div>
  );
}

export default UpdateTask;
