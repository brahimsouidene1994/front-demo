import { Box, Typography, Button, Container } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router';
import authServices from '../services/api/auth';
import sessionServices from '../services/api/session';
import CustomTextField from '../components/CustomTextField';
import { useSession } from '../services/state/context/ContextProvider';

const validationSchema = Yup.object({
    username: Yup.string().required('Username Is Required'),
    password: Yup.string().min(5).required('Password Is Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords Must Match")
        .required("Confirm Password Is Required"),
})

export default function Signup( ) {
    const {handleAuth} = useSession()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('values ->', values);
            await authServices
                .signup(values)
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
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h3">
                        Sign Up
                    </Typography>
                    <CustomTextField
                        name='username'
                        label="Username"
                        type='text'
                        formik={formik}
                    />
                    <CustomTextField
                        name='password'
                        label="Password"
                        type='password'
                        formik={formik}
                    />
                    <CustomTextField
                        label='Confirm Password'
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        formik={formik}
                    />
                    <Button type='submit' variant="contained" color='primary'>Sign Up</Button>
                    <Typography variant="h5">
                        <Link to='/'>Back To Login</Link>
                    </Typography>
                </Box>

            </form>
        </Container>
    )
}