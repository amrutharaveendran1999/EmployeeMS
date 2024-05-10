import { Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "../Login/styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Base = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="login-background">
        <Container className="login-container">
          <Typography className="login-heading">Login As</Typography>
          <div>
            <Button
              variant="contained"
              fullWidth
              className="base-div-buttons"
              onClick={() => {
                navigate("/employee_login");
              }}
            >
              Employee{" "}
            </Button>
            <Button
              variant="contained"
              fullWidth
              className="base-div-buttons"
              onClick={() => {
                navigate("/adminlogin");
              }}
            >
              Admin{" "}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Base;
