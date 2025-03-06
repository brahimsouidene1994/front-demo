import Login from "./pages/Login";
import Home from "./pages/Home";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";
import React from "react";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import sessionServices from "./services/api/session";
import authServices from "./services/api/auth";
import NewBook from "./pages/NewBook";
function Navigation() {
    const [auth, setAuth] = React.useState(false)
    React.useEffect(() =>{
        checkSession()
    },[])
    const checkSession = async()=>{
        const session = sessionServices.getSession()
        if(session){
            await authServices
                .verifySession(session)
                .then((response) => {
                    console.log("response -> ", response)
                    setAuth(true);
                })
                .catch((error) => {
                    sessionServices.removeSession()
                    console.error("Error :", error)
                });
        }

    }
    return (
        <Router>
            {
                auth ?
                    <Routes>
                        <Route path="/" exact element={<Home handleAuth={setAuth}/>} />
                        <Route path="/book/:id" element={<Book />} />
                        <Route path="/newbook/:id" element={<NewBook />} />
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