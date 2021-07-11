import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#606771",
      main: "#39424e",
      dark: "#272e36",
      contrastText: "#fff",
    },
    secondary: {
      light: "#48ba6f",
      main: "#1ba94c",
      dark: "#127635",
      contrastText: "#fff",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
