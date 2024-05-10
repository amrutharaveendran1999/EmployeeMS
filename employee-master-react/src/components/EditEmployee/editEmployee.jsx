import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Addemployee/styles.css";

import axios from "axios";

const EditEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    employeeCode: "",
    email: "",
    contactNo: "",
    department: "",
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/employee/${id}`)
      .then((result) => {
        setEmployee({
          ...employee,
          firstName: result.data.Result[0].firstName,
          lastName: result.data.Result[0].lastName,
          employeeCode: result.data.Result[0].employeeCode,
          email: result.data.Result[0].email,
          contactNo: result.data.Result[0].contactNo,
          department: result.data.Result[0].department,
          photo: result.data.Result[0].department,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const departments = ["HR", "Finance", "Marketing", "Software Development", "Testing"];
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/admin/edit_employee/${id}`, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
            UPDATE EMPLOYEE DETAILS
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditEmployee;
