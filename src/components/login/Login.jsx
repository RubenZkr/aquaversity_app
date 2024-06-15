import { Paper, TextField, Button, Typography, Link } from "@mui/material";
import React, { useState } from "react";
import { login } from "../../api/ServiceBus";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../services/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
    const {  setIsAuthenticated } = useAuth();
    const [error, setError] = useState("Login failed. Incorrect credentials.");
  const nav = useNavigate();

  const onLogin = () => {
    if (email == "" && password == "") {
      setError("Please fill in all fields");
      return;
    }

    console.log("Calling login function");
    login(email, password)
      .then((response) => {
        console.log("Response:", response);

        if (response === 200) {
          setFailedLogin(false);
            setIsAuthenticated(true);
          console.log("Reached navigation");
          nav("/levels");
        } else if (response === 401) {
            setIsAuthenticated(false);
            setFailedLogin(true);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        setFailedLogin(true);
      });
  };

  return (
    <Paper className="login">
      <h1>Login</h1>
      {failedLogin && <p style={{ color: "red" }}>{error}</p>}
      <TextField
        className="input"
        required
        id="outlined-required"
        label="E-mail"
        value={email}
        error={failedLogin}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="input"
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        value={password}
        error={failedLogin}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant={"contained"} color="primary" onClick={onLogin}>Login</Button>
      <Typography>
          Don't have an account?
        <Link href="/register">Sign up here!</Link>
      </Typography>
    </Paper>
  );
}

export default Login;
