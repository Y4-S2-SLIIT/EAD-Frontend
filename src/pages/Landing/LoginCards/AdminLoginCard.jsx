import React from 'react'
import {
    Card,
    Button,
    Form
} from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode";
import adminImage from '../../../assets/admin.jpg';

import AdminService from '../../../services/Admin.Service';

export default function AdminLoginCard() {
    const { Formik } = formik;

    const schema = yup.object({
        username: yup.string()
            .required("Enter your Username"),
        password: yup.string()
            .required("Enter your Password")
            .min(8, "Password must be at least 8 characters")
    });

    async function handleSubmit(values) {
        AdminService.login(values.username, values.password)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.token);
                    const decoded = jwtDecode(response.token);

                    AdminService.getUserById(decoded.nameid, response.token)
                        .then((user) => {
                            if (user.data.userType === 'admin') {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Login Successful',
                                    text: 'Welcome back!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                    .then(() => {
                                        window.location.href = '/admin-dashboard';
                                    })
                            }
                            if (user.data.userType === 'csr') {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Login Successful',
                                    text: 'Welcome back!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                    .then(() => {
                                        window.location.href = '/CSRDashboard';
                                    })
                            }
                        })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: 'Invalid Username or Password',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }


    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={adminImage} />
                <Card.Body>
                    <Card.Title>Admin Login</Card.Title>
                    <Card.Text>
                        Admin Login Information
                    </Card.Text>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            username: 'randula98',
                            password: 'password123'
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            errors
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='username'
                                        value={values.username}
                                        onChange={handleChange}
                                        isInvalid={touched.username && errors.username}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        name='password'
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={touched.password && errors.password}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Button variant='primary' type='submit'>Login</Button>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
            <></>
        </>
    )
}