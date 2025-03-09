import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { useParams, useNavigate } from "react-router";
import React from 'react';
import * as Yup from 'yup';
import { useBooks } from "../services/state/context/ContextProvider";
import bookServices from '../services/api/book';
import CustomTextField from '../components/CustomTextField';

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
            createdAt: book ? book.createdAt : "",
            updatedAt: book ? book.updatedAt : "",
            cover: book ? book.cover : null,
            description: book ? book.description : ''
        },
        validationSchema,
        onSubmit: async(values) => {
            console.log('values ->', values);
            //push to list book state
            if(book){

                await bookServices
                    .updateBook(id,values)
                    .then((res) => {
                        const indexBook = listBook.findIndex(_book=> parseInt(_book.id)=== parseInt(id))
                        if(indexBook !== -1){
                            listBook[indexBook] = {...listBook[indexBook], ...values}
                            handleListBook(listBook)
                            navigate('/')
                        }
                    })
                    .catch(error => console.error(error))
                
            }else{
                await bookServices
                    .newBook(values)
                    .then((res)=>{
                        listBook.push(res)
                        handleListBook(listBook)
                        navigate('/')
                    })
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
                        <CustomTextField
                            name='title'
                            label='Title'
                            type='text'
                            formik={formik}
                        />
                        <CustomTextField
                            name='author'
                            label='Author'
                            type='text'
                            formik={formik}
                        />
                        <CustomTextField
                            name='genre'
                            label='Genre'
                            type='text'
                            formik={formik}
                        />
                        <CustomTextField
                            name='price'
                            label='Price'
                            type='number'
                            formik={formik}
                        />
                        <CustomTextField
                            name='description'
                            label='Description'
                            type='text'
                            multiline={true}
                            rows={3}
                            formik={formik}
                        />

                        <Button type='submit' variant="contained" color='primary'>{book ? "Update" : "Create"}</Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
}