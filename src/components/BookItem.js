import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './BookItem.css'
import ConfirmDialog from "./ConfirmDialog";
import COVER_IMAGE from '../assets/images/cover.jpg';
export default function BookItem({ book, deleteBook }) {
    let navigate = useNavigate();
    const navigateUpdateBook = (event) => {
        event.stopPropagation();
        navigate('/newbook/' + book.id)
    }
    const handleDeleteBook = (event) => {
        event.stopPropagation();
        deleteBook(book.id)
    }
    return (
        <Card
            sx={{
                position: 'relative',
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    cursor: 'pointer',
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2);"
                },
                "&:hover .card-actions":{
                    opacity: 1
                }
            }}
            onClick={() => navigate('book/' + book.id)}
        >
            <CardMedia
                component="img"
                height="300"
                image={book.cover?book.cover:COVER_IMAGE}
                alt={book.title}
            />
            <CardContent>
                <Typography variant="h3">{book.title}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                    marginTop: 2
                }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5">Author:</Typography>
                        <Typography variant="h4">{book.author}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5">Price:</Typography>
                        <Typography variant="h4">{book.price}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <div className="card-actions">
                <IconButton  onClick={navigateUpdateBook} color="primary" aria-label="edit">
                    <EditIcon sx={{fontSize:32}}/>
                </IconButton>
                <IconButton onClick={handleDeleteBook} aria-label="delete" color="error">
                    <DeleteIcon sx={{fontSize:32}}/>
                </IconButton>
            </div>
            <ConfirmDialog />
        </Card>
    )
}
