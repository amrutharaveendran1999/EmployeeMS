import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Login/styles.css";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  console.log(values);
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Values:", values);
    axios
      .post("http://localhost:3000/employee/employee_login", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate(`/employee_detail/${result.data.id}`);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="login-background">
        <Container className="login-container">
          <Typography className="login-heading">
            {" "}
            Employee Master Login Page
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="login-fields">
              <Typography>Email</Typography>
              <TextField
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#b0b8ce",
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "#b0b8ce",
                  },
                }}
              />
            </div>
            <div className="login-fields">
              <Typography>Password</Typography>
              <TextField
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#b0b8ce",
                    },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "#b0b8ce",
                  },
                }}
              />
            </div>
            <div className="login-fields">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
                sx={{
                  backgroundColor: "	#354c7c",
                  "&:hover": {
                    backgroundColor: "	#354c7c",
                  },
                }}
              >
                Log in
              </Button>
            </div>
          </form>
          <Typography className="error-message"> {error && error}</Typography>
        </Container>
      </div>
    </div>
  );
};

export default EmployeeLogin;
