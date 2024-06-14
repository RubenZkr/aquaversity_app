import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { getLoggedInStatus, getRole, logout } from "../api/ServiceBus.js";
import { useAuth } from "../services/AuthContext.jsx";
import {SwitchModeButton} from "../components/themeSwitchButton.jsx";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } =
    useAuth();

  const [mode, setMode] = React.useState("light");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await getLoggedInStatus();
        const user = await getRole();
        setIsAdmin(user.role === "admin");
        setIsAuthenticated(response.loggedIn);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [setIsAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" component="div">
              Aquaversity
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>

          
          <SwitchModeButton />
          <Button color="inherit" component={Link} to="/Levels">
            Levels
          </Button>
          {!isAuthenticated && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
          <Button color="inherit" component={Link} to="/forum">
            Forum
          </Button>
          {isAuthenticated && (
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          )}
          {isAdmin && (
            <Button color="inherit" component={Link} to="/admin">
              Admin
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
