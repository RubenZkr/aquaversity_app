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
            fontFamily: 'Raleway, Arial',
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
    },
};

export const ColorContext = React.createContext(
    {}
);