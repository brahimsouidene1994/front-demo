import './App.css';
import React from 'react';
import Navigation from './Navigation';
import { ThemeProvider } from '@mui/material';
import ContextProvider from "./services/state/context/ContextProvider"
import MUITheme from './utils/MUITheme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={MUITheme}>
        <ContextProvider>
            <Navigation />
        </ContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;