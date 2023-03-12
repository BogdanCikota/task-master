import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { ReactComponent as DeleteIcon } from "../../assets/images/trash-solid.svg";
import { ReactComponent as EditIcon } from "../../assets/images/square-pen-solid.svg";
import { ReactComponent as InfoIcon } from "../../assets/images/circle-info-solid.svg";

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
      alert("Successfully deleted task!");
    });
  };

  return (
    <div>
      <h1>TasksPage</h1>
      <Link className="create-task button" to="/create-task">
        Create Task
      </Link>
      <br />
      <br />
      <div className="tasks-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="box">
              <div className="task-title">{task.title}</div>

              <div className="icons">
                <Link to={`/task-details/${task.id}`}>
                  <InfoIcon className="info icon" />
                </Link>

                <Link to={`/update-task/${task.id}`}>
                  <EditIcon className="edit icon" />
                </Link>

                <span onClick={() => deleteTask(task)}>
                  <DeleteIcon className="delete icon" />
                </span>
              </div>
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
