import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Form,
    Spinner,
    Alert
} from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import VendorService from '../../../services/Vendor.Service';
import Swal from 'sweetalert2';

export default function AdminVendorManagement() {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false); // State for viewing vendor details
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isVerifiedFilter, setIsVerifiedFilter] = useState('all');
    const [isDeactivatedFilter, setIsDeactivatedFilter] = useState('all');

    async function fetchVendors() {
        setLoading(true);
        try {
            const response = await VendorService.getAllVendors();
            setVendors(response);
            setFilteredVendors(response);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVendors();
    }, []);

    // Effect for filtering vendors
    useEffect(() => {
        const filtered = vendors.filter(vendor => {
            const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.phone.includes(searchQuery);

            const matchesVerification = isVerifiedFilter === 'all' ||
                (isVerifiedFilter === 'yes' && vendor.isVerified) ||
                (isVerifiedFilter === 'no' && !vendor.isVerified);

            const matchesDeactivation = isDeactivatedFilter === 'all' ||
                (isDeactivatedFilter === 'yes' && vendor.isDeactivated) ||
                (isDeactivatedFilter === 'no' && !vendor.isDeactivated);

            return matchesSearch && matchesVerification && matchesDeactivation;
        });
        setFilteredVendors(filtered);
    }, [searchQuery, vendors, isVerifiedFilter, isDeactivatedFilter]);

    const handleShowEditUserModal = (vendor) => {
        setSelectedVendor(vendor);
        setShowEditModal(true);
    };

    const handleShowViewModal = (vendor) => {
        setSelectedVendor(vendor);
        setShowViewModal(true); // Show view modal
    };

    const handleAddVendorModal = () => {
        setShowAddModal(true);
    };

    // Edit Function
    const handleEditSubmit = (values) => {
        VendorService.updateVendor(selectedVendor.id, values)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Vendor updated successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchVendors();
            })
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Failed to update vendor',
                showConfirmButton: false,
                timer: 3000
            }))
            .finally(() => setShowEditModal(false));
    };

    // Add Function
    const handleAddSubmit = (values) => {
        VendorService.register(values)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Vendor added successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchVendors();
            })
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Failed to add vendor',
                showConfirmButton: false,
                timer: 3000
            }))
            .finally(() => setShowAddModal(false));
    };

    // Delete Function
    const handleDeleteVendor = (vendorId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                VendorService.deleteVendor(vendorId)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Vendor deleted successfully',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        fetchVendors();
                    })
                    .catch(() => Swal.fire({
                        icon: 'error',
                        title: 'Failed to delete vendor',
                        showConfirmButton: false,
                        timer: 3000
                    }));
            }
        });
    };

    // Verify Function
    const handleVerifyVendor = (vendorId) => {
        VendorService.verifyVendor(vendorId)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Vendor verified successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchVendors();
            })
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Failed to verify vendor',
                showConfirmButton: false,
                timer: 3000
            }))
            .finally(() => {
                setShowViewModal(false)
                fetchVendors();
            });
    };

    // Deactivate Function
    const handleDeactivateVendor = (vendorId) => {
        VendorService.deactivateVendor(vendorId)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Vendor deactivated successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchVendors();
            })
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Failed to deactivate vendor',
                showConfirmButton: false,
                timer: 3000
            }))
            .finally(() => {
                setShowViewModal(false)
                fetchVendors();
            });
    };

    // Activate Function
    const handleActivateVendor = (vendorId) => {
        VendorService.activateVendor(vendorId)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Vendor activated successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                fetchVendors();
            })
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Failed to activate vendor',
                showConfirmButton: false,
                timer: 3000
            }))
            .finally(() => {
                setShowViewModal(false)
                fetchVendors();
            });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    return (
        <>
            <Container fluid className="vh-100 justify-content-center align-items-start admin-user-management">
                <Row className="w-100 mb-3">
                    <Col>
                        <Alert variant="primary" className="d-flex justify-content-between align-items-center">
                            <Button variant="primary" onClick={handleAddVendorModal}>Add Vendor</Button>
                            <div className="flex-grow-1 text-center">
                                <h4 className="m-0">Vendor Management</h4>
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
                                    placeholder="Search vendors..."
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
                                    <option value="all">All Vendors</option>
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
                        filteredVendors.map((vendor, index) => (
                            <Col sm={6} md={4} lg={3} key={index}> {/* Adjust column sizes for responsiveness */}
                                <Card style={{ width: '100%', minHeight: '200px', backgroundColor: '#cce6ff' }}>
                                    <Card.Body>
                                        <Card.Title>{vendor.name}</Card.Title>
                                        <Card.Text>{vendor.email} - {vendor.phone}</Card.Text>
                                        <Button variant="info" onClick={() => handleShowViewModal(vendor)} disabled={loading}>
                                            View
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="success" onClick={() => handleShowEditUserModal(vendor)} disabled={loading}>
                                            Edit
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" onClick={() => handleDeleteVendor(vendor.id)} disabled={loading}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>

                {/* Edit Vendor Modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Vendor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedVendor && (
                            <Formik
                                initialValues={{
                                    name: selectedVendor?.name || '',
                                    email: selectedVendor?.email || '',
                                    phone: selectedVendor?.phone || '',
                                    address: selectedVendor?.address || '',
                                    username: selectedVendor?.username || '',
                                    password: '' // Optional: Include password if needed
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleEditSubmit}
                            >
                                {() => (
                                    <FormikForm>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Field name="name" as={Form.Control} />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Field name="email" type="email" as={Form.Control} />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Phone</Form.Label>
                                            <Field name="phone" as={Form.Control} />
                                            <ErrorMessage name="phone" component="div" className="text-danger" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Field name="address" as={Form.Control} />
                                            <ErrorMessage name="address" component="div" className="text-danger" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Username</Form.Label>
                                            <Field name="username" as={Form.Control} />
                                            <ErrorMessage name="username" component="div" className="text-danger" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Field name="password" type="password" as={Form.Control} />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </FormikForm>
                                )}
                            </Formik>
                        )}
                    </Modal.Body>
                </Modal>

                {/* Add Vendor Modal */}
                <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Vendor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                phone: '',
                                address: '',
                                username: '',
                                password: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleAddSubmit}
                        >
                            {() => (
                                <FormikForm>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Field name="name" as={Form.Control} />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Field name="email" type="email" as={Form.Control} />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Field name="phone" as={Form.Control} />
                                        <ErrorMessage name="phone" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Field name="address" as={Form.Control} />
                                        <ErrorMessage name="address" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Field name="username" as={Form.Control} />
                                        <ErrorMessage name="username" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Field name="password" type="password" as={Form.Control} />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Vendor
                                    </Button>
                                </FormikForm>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>

                {/* View Vendor Modal */}
                <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Vendor Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedVendor && (
                            <div>
                                <h5>Name: {selectedVendor.name}</h5>
                                <p>Email: {selectedVendor.email}</p>
                                <p>Phone: {selectedVendor.phone}</p>
                                <p>Address: {selectedVendor.address}</p>
                                <p>Username: {selectedVendor.username}</p>
                                <p>Status: {selectedVendor.isDeactivated ? 'Deactivated' : 'Active'}</p>
                                <p>Verification Status: {selectedVendor.isVerified ? 'Verified' : 'Not Verified'}</p>

                                {selectedVendor.isDeactivated && (
                                    <Button
                                        variant="primary"
                                        onClick={() => handleActivateVendor(selectedVendor.id)}
                                    >Activate Vendor</Button>
                                )}{' '}

                                {!selectedVendor.isDeactivated && (
                                    <Button
                                        variant="primary"
                                        onClick={() => handleDeactivateVendor(selectedVendor.id)}
                                    >Deactivate Vendor</Button>
                                )}{' '}

                                {!selectedVendor.isVerified && (
                                    <Button
                                        variant="primary"
                                        onClick={() => handleVerifyVendor(selectedVendor.id)}
                                    >Verify Vendor</Button>
                                )}
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}