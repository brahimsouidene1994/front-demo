import './App.css';
import React from 'react';
import Navigation from './Navigation';
import { createTheme, ThemeProvider } from '@mui/material';
import ContextProvider from "./services/state/context/ContextProvider"

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem", // Default text size
          "& .MuiInputBase-input": { fontSize: "1.2rem" }, // Input text size
          "& .MuiFormHelperText-root": { fontSize: "1rem" }, // Error message size
          "& .MuiInputLabel-root": { fontSize: "1.2rem" }, // Label text size
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem", // Button text size
        },
      },
    },
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ContextProvider>
            <Navigation />
        </ContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;