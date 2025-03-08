import './Home.css'
import { Container, CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
import BookItem from "../components/BookItem";
import FloatButton from "../components/FloatButton";
import React from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import { useBooks } from "../App";
import bookServices from '../services/api/book'

export default function Home() {
    const { listBook, handleListBook } = useBooks()
    console.log("listBook", listBook)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectedBook, setSelectedBook] = React.useState(-1)

    const deleteBook = (id) => {
        setOpenDialog(true)
        setSelectedBook(id)
    }

    const handleCloseDialog = async (res) => {
        setOpenDialog(false)
        if (res) {
            await bookServices
                .deleteBook(selectedBook)
                .then((res) => {
                    const newArray = listBook.filter(_book => parseInt(_book.id) !== parseInt(selectedBook));
                    handleListBook(newArray)
                    setSelectedBook(-1)
                })
                .catch(error => console.error(error))
        }
    }

    return (
        <>
            {
                !listBook ?
                    <CircularProgress />
                    :
                    listBook.length > 0 ?
                        <Container sx={{ py: 6 }}>
                            <FloatButton />
                            <Grid container spacing={4}>
                                {
                                    listBook.map((book) => <Grid key={book.id} size={4}><BookItem book={book} deleteBook={deleteBook} /></Grid>)
                                }
                            </Grid>
                            <ConfirmDialog open={openDialog} handleCloseDialog={handleCloseDialog} />
                        </Container>
                        :
                        <h1>No Book Found</h1>
            }

        </>
    )
}