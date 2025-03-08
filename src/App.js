import './App.css';
import React from 'react';
import Navigation from './Navigation';
import { BOOKS } from './utils/FakeData';
import { createTheme, ThemeProvider } from '@mui/material';
import sessionServices from "./services/api/session";
import authServices from "./services/api/auth";
import bookServices from "./services/api/book";

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

const SessionContext = React.createContext(null)
const BookContext = React.createContext(null)

export const useSession = () => {
  return React.useContext(SessionContext)
}

export const useBooks = () => {
  return React.useContext(BookContext)
}

function App() {
  const [listBook, setListBook] = React.useState(null)
  const [auth, setAuth] = React.useState(false)

  React.useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const session = sessionServices.getSession()
    if (session) {
      await authServices
        .verifySession(session)
        .then(async (response) => {
          console.log("response -> ", response)
          setAuth(true);
          await bookServices
            .getAllBooks()
            .then((books) => {
              setListBook(books)
            })
        })
        .catch((error) => {
          sessionServices.removeSession()
          console.error("Error :", error)
        });
    }

  }

  const handleAuth = (auth) => {
    setAuth(auth)
  }

  const handleListBook = (bookArray) => {
    setListBook(bookArray)
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SessionContext.Provider value={{ auth: auth, handleAuth: handleAuth }}>
          <BookContext.Provider value={{ listBook: listBook, handleListBook: handleListBook }}>
            <Navigation />
          </BookContext.Provider>
        </SessionContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;