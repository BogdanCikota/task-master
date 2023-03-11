import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";

function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

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
  return (
    <div>
      <h1>HomePage</h1>
      <div className="statistics">
        <div>Total tasks: {tasks.length}</div>
        <div>Total employees: {employees.length}</div>
      </div>
    </div>
  );
}

export default HomePage;
