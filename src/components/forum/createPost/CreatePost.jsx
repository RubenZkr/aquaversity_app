import React, { useState } from "react";
import { Button, TextField, useTheme } from "@mui/material";

export default function CreatePost({ onPost, darkMode }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const theme = useTheme();

  const handlePost = () => {
    if (title && text) {
      const newPost = {
        title: title,
          text: text,
        date: new Date().toLocaleDateString(),
      };
      onPost(newPost);
      // Clear input fields after posting
      setTitle("");
        setText("");

    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          ...(darkMode && {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }),
        }}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          ...(darkMode && {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }),
        }}
      />
      <Button  color="primary" onClick={handlePost}>
        Post
      </Button>
    </div>
  );
}
