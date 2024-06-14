import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function ReplyDialog({
  openDialog,
  handleCloseDialog,
  handleAddComment,
  commentText,
}) {
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    handleAddComment(inputText);
    setInputText("");
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add a Comment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Your Comment"
          fullWidth
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
