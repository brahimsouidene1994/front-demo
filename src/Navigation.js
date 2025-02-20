import Login from "./pages/Login";
import Home from "./pages/Home";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";
import React from "react";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

function Navigation() {
    const [auth, setAuth] = React.useState(false)
    React.useEffect(() =>{
        console.log("component mounted")
        checkSession()
    },[])
    const checkSession = ()=>{
        const token = localStorage.getItem("session");
        if(token){
            console.log("session found ->", token);
            setAuth(true)
        } else {
            setAuth(false)
        }

    }
    return (
        <Router>
            {
                auth ?
                    <Routes>
                        <Route path="/" exact element={<Home handleAuth={setAuth}/>} />
                        <Route path="/book/:id" element={<Book />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<Login handleAuth={setAuth}/>} />
                        <Route path="/signup" element={<Signup handleAuth={setAuth}/>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
            }
        </Router>
    )
}
export default Navigation;