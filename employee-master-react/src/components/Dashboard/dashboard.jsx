import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import axios from "axios";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 250,
  },
  drawerPaper: {
    width: 250,
    backgroundColor: "#354c7c",
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const classes = useStyles();

  const handleLogout = () => {
    axios.get("http://localhost:3000/admin/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div className="sidebar-container">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className="sidebar"> </div>
        <List>
          <ListItem
            className="sidebar-list-item"
            button
            component={Link}
            to="/dashboard"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            className="sidebar-list-item"
            button
            component={Link}
            to="/dashboard/employee"
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Employees" />
          </ListItem>

          <ListItem
            className="sidebar-list-item"
            onClick={handleLogout}
            component={Link}
            button
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main>
        <div />
        <h4>
          <Typography className="heading-header">
            EMPLOYEE MANAGEMENT SYSTEM
          </Typography>
        </h4>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
