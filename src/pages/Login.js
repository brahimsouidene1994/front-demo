import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router';
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import authServices from '../services/api/auth'
import sessionServices from '../services/api/session'
import { useSession } from '../services/state/context/ContextProvider';
import CustomTextField from '../components/CustomTextField';

const validationSchema = Yup.object({
    username: Yup.string().required('Username Is Required'),
    password: Yup.string().min(5).required('Password Is Required')
})

export default function Login() {
    const { handleAuth } = useSession()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            await authServices
                .signin(values)
                .then((response) => {
                    sessionServices.saveSession(response.accessToken)
                    handleAuth(true);
                });
        },
    });
    return (
        <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3
                    }}
                >
                    <Typography variant="h3">
                        Login
                    </Typography>
                    <CustomTextField
                        label="Username"
                        name="username"
                        type="text"
                        formik={formik}
                    />
                    <CustomTextField
                        label="Password"
                        name="password"
                        type="password"
                        formik={formik}
                    />
                    <Button type='submit' variant="contained" color='primary'>Login</Button>
                    <Typography variant="h5">
                        Don't have an account yet?
                        <Link to='/signup'>Signup</Link>
                    </Typography>
                </Box>

            </form>
        </Container>
    )
}