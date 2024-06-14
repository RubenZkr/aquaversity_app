import React, { useEffect, useState } from "react";
import Level from "./Level";
import "../index.css";
import {deleteUser, getLevels, getUsers} from "../api/ServiceBus.js";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import LevelEditor from "../components/admin/LevelEditor.jsx";

const deleteAction = async (id) => {
    deleteUser(id);

    getUsers().then(response => {
        setUsers(response);
    }).catch((error) => {
        console.error('Error fetching data:', error);
    });
}

const Levels = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        // Fetch level data from the backend API
        getUsers().then(response => {
            setUsers(response);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });


    }, []);



    return (
        <div className="levels-block">
            <h3>Welcome to Admin Page</h3>
            <h4>All users:</h4>
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
                                <TableCell><Button onClick={() => deleteAction(user.id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h4>Level editor</h4>
            <LevelEditor levelId={"6c5bcb22-299e-11ef-8b42-c56fdd0990ba"} />
        </div>
    );
};

export default Levels;
