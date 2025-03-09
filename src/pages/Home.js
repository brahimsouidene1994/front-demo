import './Home.css'
import { Container, CircularProgress, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import BookItem from "../components/BookItem";
import FloatButton from "../components/FloatButton";
import React from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import { useBooks } from "../services/state/context/ContextProvider";
import bookServices from '../services/api/book'

export default function Home() {
    const { listBook, handleListBook } = useBooks()
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
        <Container sx={{ py: 6 }}>
            {
                !listBook ?
                    <CircularProgress />
                    :
                    listBook.length > 0 ?
                        <>
                            <FloatButton />
                            <Grid container spacing={4}>
                                {
                                    listBook.map((book) => <Grid key={book.id} size={4}><BookItem book={book} deleteBook={deleteBook} /></Grid>)
                                }
                            </Grid>
                            <ConfirmDialog open={openDialog} handleCloseDialog={handleCloseDialog} />
                        </>
                        :
                        <Typography variant='h1'>No Book Found</Typography>
            }

        </Container>
    )
}