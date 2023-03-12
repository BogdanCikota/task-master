import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

function UpdateEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    phone: "",
    birth: "",
    salary: "",
  });

  useEffect(() => {
    const employeeRef = doc(db, "employees", id);
    getDoc(employeeRef).then((res) => {
      const { full_name, email, phone, birth, salary } = res.data();

      setEmployee({ full_name, email, phone, birth, salary });
    });
  }, [id]);

  const updateEmployee = (e) => {
    e.preventDefault();
    if (employee.full_name === "") {
      alert("Please fill the name field.");
    } else if (employee.phone === "") {
      alert("Please fill the phone number field.");
    } else {
      const employeeRef = doc(db, "employees", id);

      updateDoc(employeeRef, employee).then(() => alert("Successfully updated employee."));
    }
  };
  return (
    <div>
      <h1>UpdateEmployee</h1>
      <form className="form box" onSubmit={(e) => updateEmployee(e)}>
        <label htmlFor="name">Full name: </label>
        <input
          type="text"
          id="name"
          required
          value={employee.full_name}
          onChange={(e) => {
            setEmployee({ ...employee, full_name: e.target.value });
          }}
        />
        <br />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          required
          value={employee.email}
          onChange={(e) => {
            setEmployee({ ...employee, email: e.target.value.trim() });
          }}
        />
        <br />
        <br />
        <label htmlFor="phone">Phone number: </label>
        <input
          type="tel"
          id="phone"
          required
          value={employee.phone}
          onChange={(e) => {
            setEmployee({ ...employee, phone: e.target.value.trim() });
          }}
        />
        <br />
        <br />
        <label htmlFor="birth">Date of birth: </label>
        <input
          type="date"
          id="birth"
          required
          value={employee.birth}
          onChange={(e) => {
            setEmployee({ ...employee, birth: e.target.value });
          }}
        />
        <br />
        <br />
        <label htmlFor="salary">Monthly salary &euro;: </label>
        <input
          type="number"
          id="salary"
          required
          value={employee.salary}
          onChange={(e) => {
            setEmployee({ ...employee, salary: e.target.value });
          }}
        />
        <br />
        <br />
        <br />
        <input className="button" type="submit" />
      </form>
    </div>
  )
}

export default UpdateEmployee