import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    employeeCode: "",
    email: "",
    contactNo: "",
    department: "",
    password: "",
    photo: "",
  });
  const navigate = useNavigate();

  const departments = [
    "HR",
    "Finance",
    "Marketing",
    "Software Development",
    "Testing",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", employee.firstName);
    formData.append("lastName", employee.lastName);
    formData.append("employeeCode", employee.employeeCode);
    formData.append("email", employee.email);
    formData.append("contactNo", employee.contactNo);
    formData.append("department", employee.department);
    formData.append("password", employee.password);
    formData.append("photo", employee.photo);

    axios
      .post("http://localhost:3000/admin/add_employee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid
          container
          className="form-container"
          spacing={2}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <div className="employee-details-head">
              <Typography variant="h6" align="center">
                EMPLOYEE DETAILS
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={employee.firstName}
              onChange={(e) =>
                setEmployee({ ...employee, firstName: e.target.value })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={employee.lastName}
              onChange={(e) =>
                setEmployee({ ...employee, lastName: e.target.value })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employee Code"
              name="employeeCode"
              value={employee.employeeCode}
              onChange={(e) =>
                setEmployee({ ...employee, employeeCode: e.target.value })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email Id"
              name="email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Contact No"
              name="contactNo"
              value={employee.contactNo}
              onChange={(e) =>
                setEmployee({ ...employee, contactNo: e.target.value })
              }
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={employee.department}
                onChange={(e) =>
                  setEmployee({ ...employee, department: e.target.value })
                }
                required
              >
                <MenuItem value="">Select Department</MenuItem>
                {departments.map((dept, index) => (
                  <MenuItem key={index} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item mt={2} xs={12} style={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" className="btn-save-emp">
              SAVE EMPLOYEE DETAILS
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddEmployee;
