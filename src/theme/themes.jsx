import React from "react";


export const lightTheme = {
    palette: {
        mode: "light",
        primary: {
            main: "#191e44",
        },
        secondary: {
            main: "#79716a",
        },
        typography: {
            // apple font
            fontFamily: "SF Pro Display, sans-serif",
        },
    },
};

export const darkTheme = {
    palette: {
        mode: "dark",
        primary: {
            main: "#3855E8",
        },
        secondary: {
            main: "#FFEDDF",
        },
        typography: {
            // apple font
        },
    },
};

export const ColorContext = React.createContext(
    {}
);