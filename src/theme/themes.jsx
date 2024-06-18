import React from "react";

export const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#3855E8",
    },
    secondary: {
      main: "#7D7D7D",
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
      main: "#0D1321",
    },
    secondary: {
      main: "#7D7D7D",
    },
    typography: {
      // apple font
    },
  },
};

export const ColorContext = React.createContext({});
