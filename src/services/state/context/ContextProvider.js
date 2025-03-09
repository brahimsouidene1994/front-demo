import React from "react";
import sessionServices from "../../api/session";
import authServices from "../../api/auth";
import bookServices from "../../api/book";
const SessionContext = React.createContext(null)
const BookContext = React.createContext(null)

export const useSession = () => {
    return React.useContext(SessionContext)
}

export const useBooks = () => {
    return React.useContext(BookContext)
}

export default function ContextProvider({ children }) {
    const [listBook, setListBook] = React.useState(null)
    const [auth, setAuth] = React.useState(false)

    React.useEffect(() => {
        checkSession()
    }, [auth])

    const checkSession = async () => {
        const session = sessionServices.getSession()
        if (session) {
            await authServices
                .verifySession(session)
                .then(async () => {
                    setAuth(true);
                    await bookServices
                        .getAllBooks()
                        .then((books) => {
                            setListBook(books)
                        })
                })
                .catch((error) => {
                    sessionServices.removeSession()
                    setListBook(null)
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
        <SessionContext.Provider value={{ auth: auth, handleAuth: handleAuth }}>
            <BookContext.Provider value={{ listBook: listBook, handleListBook: handleListBook }}>
                {children}
            </BookContext.Provider>
        </SessionContext.Provider>
    )
}