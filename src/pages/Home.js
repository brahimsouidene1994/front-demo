import { useNavigate } from "react-router";
import './Home.css'
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid2';
import sessionServices from '../services/api/session';
import { BOOKS } from "../utils/FakeData";
import BookItem from "../components/BookItem";
import FloatButton from "../components/FloatButton";
import React from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import { useBooks } from "../App";

export default function Home({ handleAuth }) {
    // const id = 10;
    // let navigate = useNavigate();
    // const logout = () => {
    //     sessionServices.removeSession()
    //     handleAuth(false)
    // }

    const { listBook, handleListBook } = useBooks()
    console.log("listBook", listBook)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectedBook, setSelectedBook] = React.useState(-1)

    const deleteBook=(id)=>{
        setOpenDialog(true)
        setSelectedBook(id)
    }

    const handleCloseDialog=(res)=>{
        setOpenDialog(false)
        if(res)
            {
                // setListBook(prevValue=> prevValue.filter(_book=>parseInt(_book.id) !== parseInt(selectedBook)));
                const newArray = listBook.filter(_book=>parseInt(_book.id) !== parseInt(selectedBook));
                handleListBook(newArray)
                setSelectedBook(-1)
            }
    }

    React.useEffect(()=>{
        console.log("list book updated")
    },[listBook])
    
    return (
        <Container sx={{ py: 6 }}>
            <FloatButton />
            <Grid container spacing={4}>
                {
                    listBook.map((book) => <Grid key={book.id} size={4}><BookItem book={book} deleteBook={deleteBook}/></Grid>)
                }
            </Grid>
            <ConfirmDialog open={openDialog} handleCloseDialog={handleCloseDialog}/>
        </Container>
    )
}