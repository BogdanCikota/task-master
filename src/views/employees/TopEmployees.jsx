import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import moment from "moment";

// Track of how many tasks are assigned to each person
// by taking in an array of tasks and returning an array of objects
// that shows the count of tasks assigned to each assignee
function countAssignees(tasks) {
  const assigneeCounts = [];
  tasks.forEach((task) => {
    const assignee = task.assignee;
    if (assignee) {
      const existingAssigneeCount = assigneeCounts.find(
        (a) => a.assigneeId === assignee
      );
      if (existingAssigneeCount) {
        existingAssigneeCount.count += 1;
      } else {
        assigneeCounts.push({ assigneeId: assignee, count: 1 });
      }
    }
  });
  return assigneeCounts;
}

function TopEmployees() {
  const [topEmployees, setTopEmployees] = useState([]);

  useEffect(() => {
    const pastMonth = moment().subtract(1, "month").format("MMMM");

    const collectionTasks = collection(db, "tasks");

    getDocs(collectionTasks).then((snapshot) => {
      if (snapshot.docs.length > 0) {
        let tasksArr = [];

        snapshot.docs.forEach((doc) => {
          const dueDateMonth = moment(doc.data().due_date).format("MMMM");

          if (dueDateMonth === pastMonth) {
            tasksArr.push({ ...doc.data(), id: doc.id });
          }
        });

        const parsedAssignees = countAssignees(tasksArr);

        // get all employees
        const collectionEmployees = collection(db, "employees");
        getDocs(collectionEmployees).then((snapshot) => {
          if (snapshot.docs.length > 0) {
            let employeesArr = [];

            snapshot.docs.forEach((doc) => {
              employeesArr.push({ ...doc.data(), id: doc.id });
            });

            let filteredEmployees = employeesArr.map((empl) => {
              let tempObj = {};
              parsedAssignees.forEach((item) => {
                if (item.assigneeId === empl.id) {
                  tempObj = { assignee: empl.full_name, count: item.count };
                }
              });

              return tempObj;
            });

            const sortedEmployees = filteredEmployees
              .sort((a, b) => b.count - a.count)
              .slice(0, 5);

            setTopEmployees(sortedEmployees);
          }
        });
      }
    });
  }, []);

  return (
    <div>
      <h1>TopEmployees</h1>
      <div className="top-employees">
        {topEmployees.length > 0 &&
          topEmployees.map((item, index) => (
            <div key={index} style={{ borderBottom: "1px solid black" }}>
              <div>{item.assignee}</div>
              Task count:
              <span>{item.count}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TopEmployees;
