import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from "@mui/material";
import {SwitchModeButton} from "../components/themeSwitchButton.jsx";


const Menu = () => {
    return (
        <List>
            <ListItem>
                <SwitchModeButton />
            </ListItem>
            <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/Levels">
                <ListItemText primary="Levels" />
            </ListItem>
            <ListItem button component={Link} to="/login">
                <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/forum">
                <ListItemText primary="Forum" />
            </ListItem>
            {/* Additional links can be added here, like this: */}
            {/* More links can be added similarly */}
        </List>
    );
};

export default Menu;
