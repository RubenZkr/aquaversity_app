import React, { useEffect, useState } from "react";
import Level from "./Level";
import "../index.css";
import {
  deleteUser,
  getLevels,
  getUsers,
  patchLevelContent,
} from "../api/ServiceBus.js";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LevelEditor from "../components/admin/LevelEditor.jsx";
import CreateQuestions from "../components/admin/CreateQuestions.jsx";

const Levels = () => {
  const [users, setUsers] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    getLevels()
      .then((response) => {
        setLevelData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // Fetch level data from the backend API
    getUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteAction = async (id) => {
    await deleteUser(id);

    await getUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  // const handleLevelUpdate = async (id, content) => {
  //     await patchLevelContent(id, content);
  //
  //     getLevels().then(response => {
  //         setLevelData(response);
  //     }).catch((error) => {
  //         console.error('Error fetching data:', error);
  //     });
  // };
  return (
    <div className="levels-block">
      <Typography variant="h3">Welcome to Admin Page</Typography>
      <Typography variant="h4">All users:</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                {/*    add button to delete*/}
                <TableCell>
                  <Button
                    onClick={() => deleteAction(user.id)}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4">Level editor</Typography>
      <p>Selecteer het level waarvan je de content en vragen wil aanpassen</p>
      <Select
        variant={"outlined"}
        value={selectedLevel}
        onChange={handleLevelChange}
      >
        {levelData.map((level, index) => (
          <MenuItem key={index} value={level.id}>
            {level.title}
          </MenuItem>
        ))}
      </Select>
      {selectedLevel && <LevelEditor levelId={selectedLevel} />}

      <div>{selectedLevel && <CreateQuestions levelId={selectedLevel} />}</div>
    </div>
  );
};

export default Levels;
