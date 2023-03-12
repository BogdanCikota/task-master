import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { ReactComponent as DeleteIcon } from "../../assets/images/trash-solid.svg";
import { ReactComponent as EditIcon } from "../../assets/images/square-pen-solid.svg";
import { ReactComponent as InfoIcon } from "../../assets/images/circle-info-solid.svg";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

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

  const deleteEmployee = (employee) => {
    const employeeRef = doc(db, "employees", employee.id);
    deleteDoc(employeeRef)
      .then(() => {
        let employeesArr = employees.filter((emp) => emp.id !== employee.id);
        setEmployees(employeesArr);
        alert("Successfully deleted employee!");
      })
      .catch((err) => alert("Error deleting employee."));
  };

  return (
    <div>
      <h1>EmployeesPage</h1>
      <div className="empoyees-buttons">
        <Link className="button create-employee" to="/create-employee">
          Create Empolyee
        </Link>

        <Link className="button" to="/top-employees">
          Top 5 Employees in the past month
        </Link>
      </div>
      <br />

      <div className="employees-list">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div key={employee.id} className="box">
              <div className="basic-info">
                <span>{employee.full_name}</span>
                <span>{employee.email}</span>
              </div>

              <div className="icons">
                <Link to={`/employee-profile/${employee.id}`}>
                  <InfoIcon className="info icon" />
                </Link>

                <Link to={`/update-employee/${employee.id}`}>
                  <EditIcon className="edit icon" />
                </Link>

                <span onClick={() => deleteEmployee(employee)}>
                  <DeleteIcon className="delete icon" />
                </span>
              </div>
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
