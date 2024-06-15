import React, { useState } from "react";
import "./post.scss";
import { Paper, Typography, Avatar, IconButton, Divider } from "@mui/material";
import { blue } from "@mui/material/colors";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyList from "../replyComment/Reply";
import ReplyDialog from "../ReplyDialog/ReplyDialog";
import {getComments, getPosts, postComment, sendLike} from "../../../api/ServiceBus.js";

export default function Post({ title, text, author,id, date,likesCount }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Set initial likes and liked state
    React.useEffect( () => {
      setLikes(likesCount);
      setLiked(false);
    }, [likesCount]);

  //on page load get all posts
  React.useEffect(() => {

    getComments(id).then((response) => {
      const newComments = response.map(comment => ({text: comment.text, replies: []}));
      setComments(prevComments => [...prevComments, ...newComments]);
    });
  }, []);

  const handleLike = async () => {
    const response = await sendLike(id);
    const {likes, liked} = response;
    setLikes(likes);
    setLiked(liked);
  };

  const handleComment = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddComment = async (commentText) => {
    if (commentText.trim() !== "") {
      await postComment(id, commentText)

      setComments([...comments, {text: commentText, replies: []}]);

      setCommentText("");
      setOpenDialog(false);
    }
  };

  return (
    <Paper className={"post-paper"} elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {text}
      </Typography>
      <div
        className="postData"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="userData">
          <Avatar sx={{ bgcolor: blue[400], mr: 1 }}>{author.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="subtitle2" sx={{ mr: 1 }}>
            {author}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mr: 1 }}>
            {date}
          </Typography>
        </div>
        <div>
          <IconButton
            color={liked ? "primary" : "default"}
            onClick={handleLike}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            {likes}
          </IconButton>
          <IconButton onClick={handleComment}>
            <CommentIcon />
            {comments.length}
          </IconButton>
        </div>
      </div>
      {/* Separate component List */}
      {comments.length > 0 && (
        <>
          <Divider sx={{ marginTop: 1 }} />
          <ReplyList comments={comments} />
        </>
      )}
      {/* Separate component dialog */}
      {openDialog && (
        <ReplyDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleAddComment={handleAddComment}
          commentText={commentText}
        />
      )}
    </Paper>
  );
}
