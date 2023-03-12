import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    due_date: "",
  });

  const [employees, setEmployees] = useState([]);

  const createNewTask = (e) => {
    e.preventDefault();
    if (task.assignee === "" || task.assignee === 0) {
      alert("Please select an employee.");
    } else if (task.title === "") {
      alert("Please fill title.");
    } else if (task.description === "") {
      alert("Please fill description.");
    } else {
      const collectionTasks = collection(db, "tasks");

      addDoc(collectionTasks, task)
        .then(() => alert("Successfully created new task!"))
        .catch((err) => alert("Error creating task"));

      e.target.reset();
      setTask({
        title: "",
        description: "",
        assignee: "",
        due_date: "",
      });
    }
  };

  useEffect(() => {
    const collectionEmployees = collection(db, "employees");
    getDocs(collectionEmployees).then((snapshot) => {
      if (snapshot.docs.length > 0) {
        let employeesArr = [];

        snapshot.docs.forEach((doc) => {
          employeesArr.push({ ...doc.data(), id: doc.id });
        });

        setEmployees(employeesArr);
      }
    });
  }, []);

  return (
    <div>
      <h1>CreateTask</h1>
      <form className="form box" onSubmit={(e) => createNewTask(e)}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          required
          onChange={(e) => {
            setTask({ ...task, title: e.target.value.trim() });
          }}
        />
        <br />
        <br />
        <label htmlFor="description">Description: </label>
        <br />
        <textarea
          id="description"
          required
          onChange={(e) => {
            setTask({ ...task, description: e.target.value.trim() });
          }}
        />
        <br />
        <br />
        <label htmlFor="assignee">Assignee: </label>
        <select
          name=""
          id="assignee"
          required
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
          onChange={(e) => {
            setTask({ ...task, due_date: e.target.value });
          }}
        />
        <br />
        <br />
        <br />
        <input type="submit" className="button submit" />

        <input type="reset" className="button reset" />
        
      </form>
    </div>
  );
}

export default CreateTask;
