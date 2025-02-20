import { useNavigate } from "react-router";
import './Home.css'
import Button from '@mui/material/Button';
export default function Home({ handleAuth }){
    const id = 10;
    let navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("session");
        handleAuth(false)
    }
    return (
        <div>
            <h1 className="title">Hello from Home Component</h1>
            <button className="btn btn-danger" onClick={()=>navigate("/book/"+id)}>Go to Book Page</button><br/>
            <Button variant="contained" size="large" onClick={logout}>logout</Button>
        </div>
    )
}