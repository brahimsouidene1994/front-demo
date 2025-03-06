import './App.css';
import React from 'react';
import Navigation from './Navigation';
import { BOOKS } from './utils/FakeData';
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


const BookContext = React.createContext(null)

export const useBooks = () => {
  return React.useContext(BookContext)
}

function App() {
  const [listBook, setListBook] = React.useState(BOOKS)

  const handleListBook = (bookArray) => {
    setListBook(bookArray)
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BookContext.Provider value={{ listBook: listBook, handleListBook: handleListBook }}>
          <Navigation />
        </BookContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;