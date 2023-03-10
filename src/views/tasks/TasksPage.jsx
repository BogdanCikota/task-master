import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import infoIcon from "../../assets/images/circle-info-solid.svg";
import editIcon from "../../assets/images/square-pen-solid.svg";
import deleteIcon from "../../assets/images/trash-solid.svg";

function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const collectionTasks = collection(db, "tasks");
    getDocs(collectionTasks).then((snapshot) => {
      if (snapshot.docs.length > 0) {
        let tasksArr = [];

        snapshot.docs.forEach((doc) => {
          tasksArr.push({ ...doc.data(), id: doc.id });
        });

        setTasks(tasksArr);
      }
    });
  }, []);

  const deleteTask = (task) => {
    console.log(task.id);
    const taskRef = doc(db, "tasks", task.id);
    deleteDoc(taskRef).then(() => {
      let tasksArr = tasks.filter((tsk) => tsk.id !== task.id);
      setTasks(tasksArr);
    });
  };

  return (
    <div>
      <h1>TasksPage</h1>
      <Link to="/create-task">Create Task</Link>
      <br />
      <br />
      <div className="tasks-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} style={{ border: "1px solid black" }}>
              <span>{task.title}</span>
              <br />
              <Link to={`/task-details/${task.id}`}>
                <img src={infoIcon} alt="info icon" width={20} />
              </Link>
              <br />
              <Link to={`/update-task/${task.id}`}>
                <img src={editIcon} alt="edit icon" width={20} />
              </Link>
              <br />
              <span onClick={() => deleteTask(task)}>
                <img src={deleteIcon} alt="delete icon" width={20} />
              </span>
            </div>
          ))
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </div>
  );
}

export default TasksPage;
