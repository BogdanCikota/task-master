import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

function EmployeeProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const employeeRef = doc(db, "employees", id);

    getDoc(employeeRef).then((response) => {
      setEmployee(response.data());
    });
  }, [id]);

  return (
    <div className="employee-profile">
      <h1>EmployeeProfile</h1>
      {employee && (
        <div className="box">
          <div><span>Name:</span> {employee.full_name}</div>
          <div><span>Email:</span> {employee.email}</div>
          <div><span>Phone:</span> {employee.phone}</div>
          <div><span>Birth:</span> {employee.birth}</div>
          <div><span>Salary &euro;:</span> {employee.salary}</div>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfile;
