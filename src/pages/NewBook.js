import { Box, Typography, TextField, Button, Container, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { useParams, useNavigate } from "react-router";
import React from 'react';
import * as Yup from 'yup';
import { useBooks } from "../App";

const validationSchema = Yup.object({
    title: Yup.string().required('Title Is Required'),
    author: Yup.string().min(5).required('Author Is Required'),
    genre: Yup.string().min(5).required('Genre Is Required'),
    price: Yup.string().required('Price Is Required'),
    description: Yup.string().required('Description Is Required'),
})

export default function NewBook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { listBook, handleListBook } = useBooks()
    const book = listBook.find((book) => book.id === parseInt(id));

    const formik = useFormik({
        initialValues: {
            title: book ? book.title : '',
            author: book ? book.author : '',
            genre: book ? book.author : '',
            price: book ? book.price : '',
            createdAt: book ? book.createdAt : "2024-01-12",
            updatedAt: book ? book.updatedAt : "2024-02-05",
            cover: book ? book.cover : null,
            description: book ? book.description : ''
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('values ->', values);
            //push to list book state
            if(book){
                const indexBook = listBook.findIndex(_book=> parseInt(_book.id)=== parseInt(id))
                if(indexBook !== -1){
                    listBook[indexBook] = {...listBook[indexBook], ...values}
                    handleListBook(listBook)
                    navigate('/')
                }
            }else{
                
                values["id"] = listBook[listBook.length-1]["id"]+1
                listBook.push(values)
                handleListBook(listBook)
                navigate('/')
            }
        },
    });
    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 2}}>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 3,
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h3">
                            {book ? "Update Book" : "Create New Book"}
                        </Typography>
                        <TextField
                            id='title'
                            name='title'
                            label='Title'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            fullWidth
                            required
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            id='author'
                            name='author'
                            label='Author'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.author}
                            fullWidth
                            required
                            onBlur={formik.handleBlur}
                            error={formik.touched.author && Boolean(formik.errors.author)}
                            helperText={formik.touched.author && formik.errors.author}
                        />
                        <TextField
                            id='genre'
                            name='genre'
                            label='Genre'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.genre}
                            fullWidth
                            required
                            onBlur={formik.handleBlur}
                            error={formik.touched.genre && Boolean(formik.errors.genre)}
                            helperText={formik.touched.genre && formik.errors.genre}
                        />
                        <TextField
                            id='price'
                            name='price'
                            label='Price'
                            type='text'
                            placeholder='$13.50'
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            fullWidth
                            required
                            onBlur={formik.handleBlur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField
                            id='description'
                            name='description'
                            label='Description'
                            type='text'
                            multiline={true}
                            rows={3}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            fullWidth
                            required
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />

                        <Button type='submit' variant="contained" color='primary'>{book ? "Update" : "Create"}</Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
}