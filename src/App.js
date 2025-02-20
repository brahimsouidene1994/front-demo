import './App.css';
import React from 'react';
import Child from './Child';
import Navigation from './Navigation';
import { createTheme, ThemeProvider } from '@mui/material';

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
  const [counterState, setCounterState] = React.useState(0);
  const incrementCounterState = () => {
    setCounterState(prevValue => {
      prevValue++;
      console.log(prevValue);
      return prevValue;
    });
  };
  return (
    <div className="App">
      {/* <Child counter={counterState} increment={incrementCounterState}/> */}
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </div>
  );
}

export default App;
