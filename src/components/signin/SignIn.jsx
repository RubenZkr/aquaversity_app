import { Paper, TextField, Button, Typography, Link } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/ServiceBus";
import "./signIn.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const signIn = () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    const capitalLetterRegex = /[A-Z]/;
    if (!capitalLetterRegex.test(password)) {
      setError("Password must contain at least one capital letter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    // Replace console logging with api call here
    register(email, password).then((response) => {
      if (response === 200) {
        navigation("/levels");
      } else {
        setError("Registration failed.");
      }
    });

    navigation("/login");
  };

  return (
    <Paper className="signup">
      <h1>Register here!</h1>
      <TextField
        className="input"
        required
        id="outlined-required"
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="input"
        required
        id="outlined-required"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className="input"
        required
        id="outlined-required"
        type="password"
        label="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button  color="primary" variant="contained" onClick={signIn}>
        Register
      </Button>
      <Typography>
        Already have an account?
        <Link href="/login">Login here!</Link>
      </Typography>
    </Paper>
  );
}
