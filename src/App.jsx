import React from 'react'
import './App.css'
import {Button, CssBaseline, ThemeProvider} from "@mui/material";
import { darkTheme, lightTheme } from "./theme/themes.jsx";
import {createTheme} from "@mui/material/styles";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/Routes.jsx";
import {ColorContext} from "./theme/themes.jsx";
import {AuthProvider} from "./services/AuthContext.jsx";


function App() {
    const [mode, setMode] = React.useState("light");
    
    
    // Moved the open state here
    const theme = React.useMemo(
        () => createTheme(mode === "light" ? lightTheme : darkTheme),
        [mode]
    );

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );
    
    return (
        <ColorContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <CssBaseline enableColorScheme />
                    <RouterProvider router={router}>
                    </RouterProvider>
                </AuthProvider>
            </ThemeProvider>
        </ColorContext.Provider>
    )
}

export default App
