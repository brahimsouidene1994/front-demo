import { Box, Typography, TextField, Button, Container } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router';
import authServices from '../services/api/auth'
import sessionServices from '../services/api/session'

const validationSchema = Yup.object({
    username: Yup.string().required('Username Is Required'),
    password: Yup.string().min(5).required('Password Is Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords Must Match")
        .required("Confirm Password Is Required"),
})

export default function Signup({ handleAuth }) {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async(values) => {
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
                    <TextField
                        id='username'
                        name='username'
                        label="Username"
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        fullWidth
                        required
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        name='password'
                        id='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        fullWidth
                        required
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        label='Confirm Password'
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        fullWidth
                        required
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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