import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { updateUser, getUserEmail } from "../../../api/ServiceBus";
import "./editUser.scss";

const EditUser = () => {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await getUserEmail();
        setEmail(response.data[0].email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchEmail();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
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

    // Here you would typically send the new email and password to your server
    updateUser(email, password).then((response) => {
      if (response.status === 200) {
        setMessage("Successfully changed your credentials");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* label should be email of user */}
      <TextField
        className="field"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="field"
        label="Change password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className="field"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button
          color="primary"
          type="submit"
              variant="outlined">
        Update
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {message && <Typography color="succes">{message}</Typography>}
    </form>
  );
};

export default EditUser;
