import { useParams } from "react-router";
import { useBooks } from "../App";
import { Box, Button, Container, Typography, Divider, Chip } from "@mui/material";
import COVER_IMAGE from '../assets/images/cover.jpg';
export default function Book() {
    const { id } = useParams();
    const { listBook } = useBooks();
    const book = listBook.find((book) => book.id === parseInt(id));
    console.log("Book Page ID: ", id);  // Output: Book Page ID:  10
    return (
        <Container sx={{ py: 6, display: 'flex', flexDirection: 'row', gap: 3 }}>
            <img src={book.cover ? book.cover : COVER_IMAGE} alt={book.title} style={{ width: '400px', borderRadius: 6 }} />
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: 6 }}>
                <Typography variant="h3">{book.title} <Typography variant='h5' color="textSecondary">by {book.author}</Typography></Typography>
                <Chip sx={{ fontSize: '1.5rem', my: 2 }} label={book.genre} variant="outlined" color='primary' />
                <Typography variant="h6">Publication Date: {book.createdAt}</Typography>
                <Typography variant="h5">
                    {book.description}
                    <Divider sx={{ my: 2 }} orientation="horizontal" flexItem />
                </Typography>
                <Box sx={{ py: 2 }}>
                    <Button size='large' color="primary" variant="contained" sx={{ mx: 4 }}>Add To Cart</Button>
                    <Button size='large' color="primary" variant="outlined" >Add To Wishlist</Button>
                </Box>
            </Box>
        </Container>
    )
}