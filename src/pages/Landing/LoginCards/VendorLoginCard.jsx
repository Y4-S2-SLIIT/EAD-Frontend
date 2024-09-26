import React from 'react'
import {
    Card,
    Button,
    Form
} from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2'

import VendorService from '../../../services/Vendor.Service';

export default function VendorLoginCard() {
    const { Formik } = formik;

    const schema = yup.object({
        username: yup.string()
            .required("Enter your Username"),
        password: yup.string()
            .required("Enter your Password")
            .min(8, "Password must be at least 8 characters")
    });

    async function handleSubmit(values) {
        VendorService.login(values.username, values.password)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('erp-vendorId', response.vendorId);
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: 'Welcome back!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then(() => {
                            localStorage.setItem('erp-role', 'vendor');
                            localStorage.setItem('erp-username', values.username);
                            localStorage.setItem('erp-nav', 'vendor-dashoboard');
                            window.location.href = '/vendor/dashoboard';
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
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Vendor Login</Card.Title>
                    <Card.Text>
                        Vendor Login Information
                    </Card.Text>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            username: 'vendor98',
                            password: 'randula12344'
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