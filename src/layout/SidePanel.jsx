import {Box, Drawer} from "@mui/material";
import React from 'react';
import Menu from "./Menu.jsx";

export const SidePanel = ({ open, setOpen }) => { // Accept the open and setOpen props

    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            sx={
                {
                    width: "250px",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: "25vw",
                        boxSizing: "border-box",
                    },
                }
            }
        >
            <Box
                sx={{
                    width: "25vw",
                    padding: "20px",
                }}
            >

                    <Menu />
            </Box>
        </Drawer>
    );
};