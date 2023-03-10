import React, { useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function CreateEmployee() {
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    phone: "",
    birth: null,
    salary: null,
  });

  const createNewEmployee = (e) => {
    e.preventDefault();
    if (employee.full_name === "") {
      alert("Please fill the name field.");
    } else if (employee.phone === "") {
      alert("Please fill the phone number field.");
    } else {
      const collectionEmployees = collection(db, "employees");

      addDoc(collectionEmployees, employee).then(
        getDocs(collectionEmployees).then((snapshot) => {
          let employees = [];

          snapshot.docs.forEach((doc) => {
            employees.push({ ...doc.data(), id: doc.id });
          });

          console.log(employees);
          alert("Successfully created new employee!");
        })
      );

      e.target.reset();
      setEmployee({
        full_name: "",
        email: "",
        phone: null,
        birth: null,
        salary: null,
      });
    }
  };
  return (
    <div>
      <h1>CreateEmployee</h1>
      <form onSubmit={(e) => createNewEmployee(e)}>
        <label htmlFor="name">Full name: </label>
        <input
          type="text"
          id="name"
          required
          onChange={(e) => {
            setEmployee({ ...employee, full_name: e.target.value.trim() });
          }}
        />
        <br />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          required
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
          onChange={(e) => {
            setEmployee({ ...employee, salary: e.target.value });
          }}
        />
        <br />
        <br />
        <input type="reset" />
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateEmployee;