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
    <div>
      <h1>EmployeeProfile</h1>
      {employee && (
        <div>
          <div>Name: {employee.full_name}</div>
          <div>Email: {employee.email}</div>
          <div>Phone: {employee.phone}</div>
          <div>Birth: {employee.birth}</div>
          <div>Salary &euro;: {employee.salary}</div>
        </div>
      )}
    </div>
  );
}

export default EmployeeProfile;
