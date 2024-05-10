import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const Employee = () => {
  const [employees, setEmployee] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, [departmentFilter]);

  const fetchEmployees = () => {
    let url = "http://localhost:3000/admin/employee";
    if (departmentFilter) {
      url += `?department=${departmentFilter}`;
    }
    axios.get(url)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/admin/delete_employee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          fetchEmployees();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  return (
    <>
    <div className="employee-table-head">
        <Typography ml={2} mt={4}>  Employee Table</Typography>
      </div>
      <div className="create-employee-button-container">
        <Link to="/dashboard/add_employee" className="link">
          <Button
            variant="contained"
            className="create-employee-button"
            sx={{
              backgroundColor: "#354c7c",
              "&:hover": {
                backgroundColor: "#354c7c",
              },
            }}
          >
            Create New Employee +
          </Button>
        </Link>
      </div>
      <div >
        <FormControl>
          <Select
            value={departmentFilter}
            onChange={handleFilterChange}
            displayEmpty
            className="filter"
          >
            <MenuItem value="" disabled>
              Filter by Department
            </MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Software Development">Software Development</MenuItem>
            <MenuItem value="Testing">Testing</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TableContainer className="employee-table-container" component={Paper}>
          <Table>
            <TableHead className="table-head">
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Employee Code</TableCell>
                <TableCell>Email Id</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((employee, index) => (
                  <TableRow key={employee.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{employee.firstName}</TableCell>
                    <TableCell>{employee.lastName}</TableCell>
                    <TableCell>{employee.employeeCode}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.contactNo}</TableCell>
                    <TableCell>{employee.department}</TableCell>

                    <TableCell>
                      <Link
                        to={`/dashboard/edit_employee/${employee.id}`}
                        className="link"
                      >
                        <Button variant="text" color="primary">
                          <EditIcon />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handleDelete(employee.id)}
                        variant="text"
                        color="secondary"
                        style={{ marginLeft: "10px" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Employee;
