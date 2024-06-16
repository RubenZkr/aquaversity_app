import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../assets/styles/levels.css";

const level = ({ id, level, title, summary, disabled, isUnlocked }) => {
  const navigate = useNavigate();
  const handleClick = (level) => {
    if (isUnlocked) {
      navigate(`/Level/${id}`);
    }
  };
  return (
    <div className="level">
      <Card
        sx={{ maxWidth: 345 }}
        className={!isUnlocked ? "disabled-level" : ""}
        raised={true}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height="140"
            image={"../public/images/level-" + level + ".jpg"}
            alt={"photo level" + level}
          />
          <CardContent
            className={isUnlocked ? "not-disabled-level" : "disabled-level"}
          >
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default level;
