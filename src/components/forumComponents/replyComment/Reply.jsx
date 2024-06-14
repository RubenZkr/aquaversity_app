import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";

const ReplyList = ({ comments }) => {
  return (
    <List>
      {comments.map((comment, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{comment.text.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={comment.text} />
          </ListItem>
          {comment.replies.length > 0 && (
            <List disablePadding>
              {comment.replies.map((reply, index) => (
                <ListItem key={index} sx={{ pl: 4 }}>
                  <ListItemAvatar>
                    <Avatar>{reply.text.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={reply.text} />
                </ListItem>
              ))}
            </List>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default ReplyList;
