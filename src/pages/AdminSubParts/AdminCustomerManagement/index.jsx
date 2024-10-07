import React, { useEffect, useState } from 'react';
import {
    Alert,
    Container,
    Row,
    Col,
    Button,
    Modal,
    Spinner,
    Form,
    Card
} from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomerService from '../../../services/Customer.Serivce';
import Swal from 'sweetalert2';

export default function AdminCustomerManagement() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isVerifiedFilter, setIsVerifiedFilter] = useState('all');
    const [isDeactivatedFilter, setIsDeactivatedFilter] = useState('all');
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    async function fetchCustomers() {
        setLoading(true);
        try {
            const response = await CustomerService.getAllCustomers();
            setCustomers(response);
            setFilteredCustomers(response);
        } catch (err) {
            console.log(err);
            Swal.fire('Error', 'Failed to fetch customers', 'error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        let filtered = customers;

        if (searchQuery) {
            filtered = filtered.filter(customer =>
                customer.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (isVerifiedFilter !== 'all') {
            filtered = filtered.filter(customer =>
                customer.isVerified === (isVerifiedFilter === 'yes')
            );
        }

        if (isDeactivatedFilter !== 'all') {
            filtered = filtered.filter(customer =>
                customer.isDeactivated === (isDeactivatedFilter === 'yes')
            );
        }

        setFilteredCustomers(filtered);
    }, [customers, searchQuery, isVerifiedFilter, isDeactivatedFilter]);

    const handleShowViewModal = (customer) => {
        setSelectedCustomer(customer);
        setShowViewModal(true);
    };

    const handleCloseModal = () => {
        setShowViewModal(false);
        setSelectedCustomer(null);
    };

    const handleDeleteCustomer = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await CustomerService.deleteCustomer(id);
                Swal.fire('Deleted!', 'The customer has been deleted.', 'success');
                fetchCustomers(); // Refresh the customer list
            } catch (err) {
                console.log(err);
                Swal.fire('Error', 'Failed to delete customer', 'error');
            }
        }
    };

    const handleActivateCustomer = async (id) => {
        const result = await Swal.fire({
            title: 'Activate Customer?',
            text: "This will activate the customer account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, activate it!'
        });

        if (result.isConfirmed) {
            try {
                await CustomerService.activateCustomer(id);
                await Swal.fire({
                    title: 'Activated!',
                    text: 'The customer has been activated.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchCustomers();
            } catch (err) {
                console.log(err);
                await Swal.fire({
                    title: 'Error',
                    text: 'Failed to activate customer',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }
    };

    const handleDeactivateCustomer = async (id) => {
        const result = await Swal.fire({
            title: 'Deactivate Customer?',
            text: "This will deactivate the customer account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, deactivate it!'
        });

        if (result.isConfirmed) {
            try {
                await CustomerService.deactivateCustomer(id);
                await Swal.fire({
                    title: 'Deactivated!',
                    text: 'The customer has been deactivated.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchCustomers();
            } catch (err) {
                console.log(err);
                await Swal.fire({
                    title: 'Error',
                    text: 'Failed to deactivate customer',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }
    };

    const handleVerifyCustomer = async (id) => {
        const result = await Swal.fire({
            title: 'Verify Customer?',
            text: "This will verify the customer account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, verify it!'
        });

        if (result.isConfirmed) {
            try {
                await CustomerService.verifyCustomer(id);
                await Swal.fire({
                    title: 'Verified!',
                    text: 'The customer has been verified.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchCustomers();
            } catch (err) {
                console.log(err);
                await Swal.fire({
                    title: 'Error',
                    text: 'Failed to verify customer',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }
    };

    return (
        <>
            <Container fluid className="vh-100 justify-content-center align-items-center overflow-auto">
                <Row className="w-100 mb-3">
                    <Col>
                        <Alert variant="primary" className="d-flex justify-content-between align-items-center">
                            <div className="flex-grow-1 text-center">
                                <h4 className="m-0">Customer Management</h4>
                            </div>
                        </Alert>
                    </Col>
                </Row>

                <Row className="w-100 mb-3">
                    <Col>
                        <Alert variant="primary" className="d-flex justify-content-between align-items-center">
                            <Col xs={3} className="ms-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search customers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={loading}
                                />
                            </Col>
                            {/* Filter isVerified */}
                            <Col xs={3} className="ms-3">
                                <Form.Select
                                    value={isVerifiedFilter}
                                    onChange={(e) => setIsVerifiedFilter(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="all">All Customers</option>
                                    <option value="yes">Verified</option>
                                    <option value="no">Not Verified</option>
                                </Form.Select>
                            </Col>
                            {/* Filter isDeactivated */}
                            <Col xs={3} className="ms-3">
                                <Form.Select
                                    value={isDeactivatedFilter}
                                    onChange={(e) => setIsDeactivatedFilter(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="yes">Deactivated</option>
                                    <option value="no">Active</option>
                                </Form.Select>
                            </Col>
                        </Alert>
                    </Col>
                </Row>

                <Row className="g-4">
                    {loading ? (
                        <Col className="text-center">
                            <Spinner animation="border" role="status" />
                        </Col>
                    ) : (
                        filteredCustomers.map((customer, index) => (
                            <Col sm={6} md={4} lg={3} key={index}>
                                <Card style={{ width: '100%', minHeight: '200px', backgroundColor: '#cce6ff' }}>
                                    <Card.Body>
                                        <Card.Title>{customer.name}</Card.Title>
                                        <Card.Text>{customer.email} - {customer.phone}</Card.Text>
                                        <Button variant="info" onClick={() => handleShowViewModal(customer)} disabled={loading}>
                                            View
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" onClick={() => handleDeleteCustomer(customer.id)} disabled={loading}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>

                {/* View Customer Modal */}
                <Modal show={showViewModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Customer Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedCustomer && (
                            <div>
                                <h5>Name: {selectedCustomer.name}</h5>
                                <p>Email: {selectedCustomer.email}</p>
                                <p>Phone: {selectedCustomer.phone}</p>
                                <p>Address: {selectedCustomer.address}</p>
                                <p>Username: {selectedCustomer.username}</p>
                                <p>Status: {selectedCustomer.isDeactivated ? 'Deactivated' : 'Active'}</p>
                                <p>Verification Status: {selectedCustomer.isVerified ? 'Verified' : 'Not Verified'}</p>

                                {selectedCustomer.isDeactivated && (
                                    <Button
                                        variant="primary"
                                        onClick={() => handleActivateCustomer(selectedCustomer.id)}
                                        className="mt-2"
                                    >
                                        Activate Customer
                                    </Button>
                                )}{' '}

                                {!selectedCustomer.isDeactivated && (
                                    <Button
                                        variant="warning"
                                        onClick={() => handleDeactivateCustomer(selectedCustomer.id)}
                                        className="mt-2"
                                    >
                                        Deactivate Customer
                                    </Button>
                                )}{' '}

                                {!selectedCustomer.isVerified && (
                                    <Button
                                        variant="success"
                                        onClick={() => handleVerifyCustomer(selectedCustomer.id)}
                                        className="mt-2"
                                    >
                                        Verify Customer
                                    </Button>
                                )}{' '}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}