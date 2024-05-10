import "./App.css";
import AddEmployee from "./components/Addemployee/addEmployee";
import Base from "./components/Base/base";
import Dashboard from "./components/Dashboard/dashboard";
import EditEmployee from "./components/EditEmployee/editEmployee";
import Employee from "./components/Employee/employee";
import EmployeeDetails from "./components/EmployeeDetails/employeeDetails";
import EmployeeLogin from "./components/EmployeeLogin/employeeLogin";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Base />}></Route>
          <Route path="/adminlogin" element={<Login />}></Route>
          <Route path="/employee_login" element={<EmployeeLogin />}></Route>
          <Route
            path="/employee_detail/:id"
            element={<EmployeeDetails />}
          ></Route>
          <Route path="/edit_employee/:id" element={<EditEmployee />}></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="" element={<Home />}></Route>
            <Route path="/dashboard/employee" element={<Employee />}></Route>
            <Route
              path="/dashboard/add_employee"
              element={<AddEmployee />}
            ></Route>
            <Route
              path="/dashboard/edit_employee/:id"
              element={<EditEmployee />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
