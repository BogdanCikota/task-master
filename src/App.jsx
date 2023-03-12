import "./assets/styles/index.scss";
import { Route, Routes, HashRouter } from "react-router-dom";
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
import Navigation from "./components/Navigation";

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Navigation />
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
