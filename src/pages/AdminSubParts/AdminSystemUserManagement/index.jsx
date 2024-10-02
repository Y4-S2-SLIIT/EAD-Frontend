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
import AdminService from '../../../services/Admin.Service';
import Swal from 'sweetalert2';

export default function AdminSystemUserManagement() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserType, setSelectedUserType] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseAddUserModal = () => setShowAddUserModal(false);
    const handleCloseEditUserModal = () => setShowEditUserModal(false);

    const handleShowAddUserModal = () => {
        setSelectedUser(null);
        setShowAddUserModal(true);
    };
    const handleShowEditUserModal = (user) => {
        setSelectedUser(user);
        setShowEditUserModal(true);
    };

    async function fetchUsers() {
        setLoading(true);
        AdminService.getAllUsers()
            .then(data => {
                setUsers(data.data);
                setFilteredUsers(data.data);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const results = users.filter(user => {
            const matchesUserType = selectedUserType ? user.userType === selectedUserType : true;
            const matchesSearchQuery =
                user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesUserType && matchesSearchQuery;
        });
        setFilteredUsers(results);
    }, [searchQuery, selectedUserType, users]);

    // Validation Schema
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        userType: Yup.string().oneOf(['admin', 'csr'], 'Invalid user type').required('User type is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleAdd = (values, { resetForm }) => {
        setLoading(true);
        AdminService.createUser(values)
            .then(() => {
                fetchUsers();
                Swal.fire({
                    title: 'Success!',
                    text: 'User added successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add user. Please try again.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                });
            })
            .finally(() => {
                resetForm();
                handleCloseAddUserModal();
                setLoading(false);
            });
    };

    const handleEdit = (values, { resetForm }) => {
        setLoading(true);
        AdminService.updateUser({ ...selectedUser, ...values })
            .then(() => {
                fetchUsers();
                Swal.fire({
                    title: 'Success!',
                    text: 'User updated successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update user. Please try again.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                });
            })
            .finally(() => {
                resetForm();
                handleCloseEditUserModal();
                setLoading(false);
            });
    };

    const handleDelete = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This user will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                AdminService.deleteUser(userId)
                    .then(() => {
                        fetchUsers();
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'User has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 3000,
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete user. Please try again.',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 3000,
                        });
                    })
                    .finally(() => setLoading(false));
            }
        });
    };

    function getUserTypeLabel(userType) {
        switch (userType) {
            case 'admin':
                return 'System Administrator';
            case 'csr':
                return 'Customer Service Representative';
            default:
                return 'Unknown';
        }
    }

    const userTypes = [
        { value: '', label: 'All Users' },
        { value: 'admin', label: 'Admin' },
        { value: 'csr', label: 'CSR' },
    ];

    return (
        <>
            <Container fluid className="vh-100 justify-content-center align-items-start admin-user-management">
                <Row className="w-100 mb-3">
                    <Col>
                        <Alert variant="primary" className="d-flex justify-content-between align-items-center">
                            <Button variant="primary" onClick={handleShowAddUserModal} disabled={loading}>
                                {loading ? 'Adding...' : 'Add New User'}
                            </Button>
                            <div className="flex-grow-1 text-center">
                                <h4 className="m-0">System User Management</h4>
                            </div>
                            <Col xs={2} className="ms-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={loading}
                                />
                            </Col>
                            <Col xs={2} className="ms-3">
                                <Form.Select
                                    aria-label="Select User Type"
                                    value={selectedUserType}
                                    onChange={(e) => setSelectedUserType(e.target.value)}
                                    disabled={loading}
                                >
                                    {userTypes.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
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
                        filteredUsers.map((user, index) => (
                            <Col sm={3} key={index}>
                                <Card style={{ width: '100%', minHeight: '200px', backgroundColor: '#cce6ff' }}>
                                    <Card.Body>
                                        <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
                                        <Card.Text>{user.email} - {user.phone}</Card.Text>
                                        <Card.Text>
                                            {getUserTypeLabel(user.userType)}
                                        </Card.Text>
                                        <Button variant="success" onClick={() => handleShowEditUserModal(user)} disabled={loading}>Edit</Button>&nbsp;&nbsp;
                                        <Button variant="danger" onClick={() => handleDelete(user.id)} disabled={loading}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>

            </Container>

            {/* Add Modal */}
            <Modal show={showAddUserModal} onHide={handleCloseAddUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            userType: '',
                            username: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleAdd}
                    >
                        {({ handleSubmit }) => (
                            <FormikForm onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Field type="text" name="FirstName" className="form-control" />
                                    <ErrorMessage name="FirstName" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Field type="text" name="LastName" className="form-control" />
                                    <ErrorMessage name="LastName" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Field type="email" name="Email" className="form-control" />
                                    <ErrorMessage name="Email" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Field type="text" name="Phone" className="form-control" />
                                    <ErrorMessage name="Phone" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>User Type</Form.Label>
                                    <Field as="select" name="UserType" className="form-control">
                                        <option value="">Select User Type</option>
                                        <option value="admin">Admin</option>
                                        <option value="csr">CSR</option>
                                    </Field>
                                    <ErrorMessage name="UserType" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Field type="text" name="Username" className="form-control" />
                                    <ErrorMessage name="Username" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Field type="password" name="Password" className="form-control" />
                                    <ErrorMessage name="Password" component="div" className="text-danger" />
                                </Form.Group>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseAddUserModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save'}
                                    </Button>
                                </Modal.Footer>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditUserModal} onHide={handleCloseEditUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            firstName: selectedUser?.firstName || '',
                            lastName: selectedUser?.lastName || '',
                            email: selectedUser?.email || '',
                            phone: selectedUser?.phone || '',
                            userType: selectedUser?.userType || '',
                            username: selectedUser?.username || '',
                            password: selectedUser?.password || '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleEdit}
                    // enableReinitialize={true}
                    >
                        {({ handleSubmit }) => (
                            <FormikForm onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Field type="text" name="firstName" className="form-control" />
                                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Field type="text" name="lastName" className="form-control" />
                                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Field type="text" name="phone" className="form-control" />
                                    <ErrorMessage name="phone" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>User Type</Form.Label>
                                    <Field as="select" name="userType" className="form-control">
                                        <option value="">Select User Type</option>
                                        <option value="admin">Admin</option>
                                        <option value="csr">CSR</option>
                                    </Field>
                                    <ErrorMessage name="userType" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Field type="text" name="username" className="form-control" />
                                    <ErrorMessage name="username" component="div" className="text-danger" />
                                </Form.Group>

                                {/* <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Field type="password" name="password" className="form-control" />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </Form.Group> */}

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditUserModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save'}
                                    </Button>
                                </Modal.Footer>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}