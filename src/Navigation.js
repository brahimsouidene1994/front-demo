import Login from "./pages/Login";
import Home from "./pages/Home";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";
import React from "react";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NewBook from "./pages/NewBook";
import { useSession } from "./services/state/context/ContextProvider";
function Navigation() {
    const {auth} = useSession()
    return (
        <Router>
            {
                auth ?
                    <Routes>
                        <Route path="/" exact element={<Home/>} />
                        <Route path="/book/:id" element={<Book />} />
                        <Route path="/newbook/:id" element={<NewBook />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
            }
        </Router>
    )
}
export default Navigation;