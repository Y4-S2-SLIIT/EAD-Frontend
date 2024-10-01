import React, { useState, useEffect } from 'react';
import {
    Alert,
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Form,
    Spinner
} from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import VendorService from '../../../services/Vendor.Service';
import Swal from 'sweetalert2';

export default function AdminVendorManagement() {
    return (
        <>
            <Container
                fluid
                className="d-flex vh-100 justify-content-center align-items-center"
            >
                <Row>
                    <Col>
                        <Alert variant='primary'>
                            Admin Vendor Management
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
