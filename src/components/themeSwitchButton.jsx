import { Box, IconButton, useTheme } from "@mui/material";
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';
import React from "react";
import {ColorContext} from "../theme/themes.jsx";


export const SwitchModeButton = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorContext);

    return (
        <Box>
            <IconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
            >
                {theme.palette.mode === "dark" ? <Brightness3Icon /> : <LightModeIcon />  }
            </IconButton>
        </Box>
    );
};