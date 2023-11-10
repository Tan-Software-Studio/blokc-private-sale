import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import ThemeStyles from "./assets/styles/ThemeStyles";
import GlobalStyles from "./assets/styles/GlobalStyles";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={ThemeStyles}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
