import React from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import "./styles.css";

const Home = () => {
  return (
    <>
      <Typography className="dashboard-heading" >DUMMY DASHBOARD</Typography>
      <Container className="dashboard-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="dashboard-card">
              <Typography variant="h6" gutterBottom>
                Add New Employee
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="dashboard-card">
              <Typography variant="h6" gutterBottom>
                View Employees
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="dashboard-card">
              <Typography variant="h6" gutterBottom>
                Edit Employee
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
