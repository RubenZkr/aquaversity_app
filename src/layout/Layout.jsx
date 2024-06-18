import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidePanel } from "./SidePanel.jsx";
import { Button, Container, Toolbar } from "@mui/material";
import Header from "./Header.jsx";
import { getLoggedInStatus } from "../api/ServiceBus.js";

const Layout = () => {
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const res = await getLoggedInStatus();
        setIsLoggedIn(res.loggedIn);
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    fetchLoginStatus();
  }, []);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Toolbar /> {/* Placeholder for the height of AppBar */}
      <SidePanel open={open} setOpen={setOpen} />
      <Container>
        <main>
          <Outlet />
          {/* This is where the router's content will be displayed */}
        </main>
      </Container>
      <footer>
        {/* You can add your site's footer here */}
        <p>© 2024 Aquaversity</p>
      </footer>
    </div>
  );
};

export default Layout;
