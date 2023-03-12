import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const { pathname } = useLocation();
  return (
    <div className="nav">
      <ul>
        <li>
          <Link className={pathname === "/" ? "active" : ""} to="/">
            Home
          </Link>
        </li>

        <li>
          <Link className={pathname === "/tasks" ? "active" : ""} to="tasks">
            Tasks
          </Link>
        </li>

        <li>
          <Link
            className={pathname === "/employees" ? "active" : ""}
            to="employees"
          >
            Employees
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
