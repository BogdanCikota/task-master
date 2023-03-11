import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import infoIcon from "../../assets/images/circle-info-solid.svg";
import editIcon from "../../assets/images/square-pen-solid.svg";
import deleteIcon from "../../assets/images/trash-solid.svg";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

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

  const deleteEmployee = (employee) => {
    const employeeRef = doc(db, "employees", employee.id);
    deleteDoc(employeeRef).then(() => {
      let employeesArr = employees.filter((emp) => emp.id !== employee.id);
      setEmployees(employeesArr);
    });
  };

  return (
    <div>
      <h1>EmpolyeesPage</h1>
      <Link to="/create-employee">Create Empolyee</Link>
      <br />
      <br />
      <div className="employee-list">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div key={employee.id} style={{ border: "1px solid black" }}>
              <span>{employee.full_name}</span>
              <br />
              <Link to={`/employee-profile/${employee.id}`}>
                <img src={infoIcon} alt="info icon" width={20} />
              </Link>
              <br />
              <Link to={`/update-employee/${employee.id}`}>
                <img src={editIcon} alt="edit icon" width={20} />
              </Link>
              <br />
              <span onClick={() => deleteEmployee(employee)}>
                <img src={deleteIcon} alt="delete icon" width={20} />
              </span>
            </div>
          ))
        ) : (
          <div>no employees</div>
        )}
      </div>
    </div>
  );
}

export default EmployeesPage;
