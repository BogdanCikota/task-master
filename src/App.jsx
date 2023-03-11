import {
  Route,
  Link,
  Routes,
  HashRouter,
} from "react-router-dom";
import "./App.css";
import EmployeesPage from "./views/employees/EmployeesPage";
import TasksPage from "./views/tasks/TasksPage";
import HomePage from "./views/home/HomePage";
import CreateEmployee from "./views/employees/CreateEmployee";
import EmployeeProfile from "./views/employees/EmployeeProfile";
import UpdateEmployee from "./views/employees/UpdateEmployee";
import TopEmployees from "./views/employees/TopEmployees";
import CreateTask from "./views/tasks/CreateTask";
import TaskDetails from "./views/tasks/TaskDetails";
import UpdateTask from "./views/tasks/UpdateTask";
import NotFound from "./views/notFound/NotFound";

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <div className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="employees">Employees</Link>
            </li>
            <li>
              <Link to="tasks">Tasks</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route exact path="employees" element={<EmployeesPage />} />
          <Route exact path="create-employee" element={<CreateEmployee />} />
          <Route
            exact
            path="employee-profile/:id"
            element={<EmployeeProfile />}
          />
          <Route
            exact
            path="update-employee/:id"
            element={<UpdateEmployee />}
          />
          <Route exact path="top-employees" element={<TopEmployees />} />

          <Route exact path="tasks" element={<TasksPage />} />
          <Route exact path="create-task" element={<CreateTask />} />
          <Route exact path="task-details/:id" element={<TaskDetails />} />
          <Route exact path="update-task/:id" element={<UpdateTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
