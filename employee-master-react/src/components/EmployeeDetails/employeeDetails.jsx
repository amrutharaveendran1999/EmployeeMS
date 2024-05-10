import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import "./styles.css";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/detail/${id}`)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="emp-profile-card" variant="outlined">
      <div>
        <Avatar
          className="avatar"
          alt="Employee"
          src={`http://localhost:3000/images/` + employee.photo}
        />

        <Typography variant="h5" component="div" ml={22} mt={2}>
          {employee.firstName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Link to={`/edit_employee/${employee.id}`}>
              <Button
                className="profile-button"
                variant="contained"
                color="primary"
                fullWidth
              >
                Edit
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleLogout}
              className="profile-button"
              variant="contained"
              color="primary"
              fullWidth
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default EmployeeDetails;
