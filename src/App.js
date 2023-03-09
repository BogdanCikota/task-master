import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import EmployeesPage from "./views/employees/EmployeesPage";
import TasksPage from "./views/tasks/TasksPage";
import HomePage from "./views/home/HomePage";
import CreateEmployee from "./views/employees/CreateEmployee";
import EmployeeProfile from "./views/employees/EmployeeProfile";
import UpdateEmployee from "./views/employees/UpdateEmployee";
import CreateTask from "./views/tasks/CreateTask";
import TaskDetails from "./views/tasks/TaskDetails";
import UpdateTask from "./views/tasks/UpdateTask";


function App() {
  return (
    <div className="App">
      <Router>
      <div className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="employees">Employees</Link></li>
            <li><Link to="tasks">Tasks</Link></li>
          </ul>
        </div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route exact path="employees" element={<EmployeesPage />} />
          <Route exact path="create-employee" element={<CreateEmployee />} />
          <Route exact path="employee-profile" element={<EmployeeProfile />} />
          <Route exact path="update-employee" element={<UpdateEmployee />} />
          
          <Route exact path="tasks" element={<TasksPage />} />
          <Route exact path="create-task" element={<CreateTask />} />
          <Route exact path="task-details" element={<TaskDetails />} />
          <Route exact path="update-task" element={<UpdateTask />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
