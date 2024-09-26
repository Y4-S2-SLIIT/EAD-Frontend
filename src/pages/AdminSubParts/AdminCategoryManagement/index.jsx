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
import CategoryService from '../../../services/Category.Service';
import Swal from 'sweetalert2';

export default function AdminCategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseAddCategoryModal = () => setShowAddCategoryModal(false);
    const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);

    const handleShowAddCategoryModal = () => {
        setSelectedCategory(null);
        setShowAddCategoryModal(true);
    };
    const handleShowEditCategoryModal = (category) => {
        setSelectedCategory(category);
        setShowEditCategoryModal(true);
    };

    async function fetchCategories() {
        setLoading(true);
        CategoryService.getAllCategories()
            .then(data => {
                console.log(data);
                setCategories(data);
                setFilteredCategories(data); // Initialize filtered categories
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    // Filter categories based on search query
    useEffect(() => {
        const results = categories.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(results);
    }, [searchQuery, categories]);

    // Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Category name is required'),
        description: Yup.string().required('Category description is required'),
    });

    // Submit Handler for Adding
    const handleAdd = (values, { resetForm }) => {
        setLoading(true);
        CategoryService.createCategory(values)
            .then(data => {
                console.log(data);
                fetchCategories();
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Category added successfully.',
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add category. Please try again.',
                });
            })
            .finally(() => {
                resetForm();
                handleCloseAddCategoryModal();
                setLoading(false);
            });
    };

    // Submit Handler for Editing
    const handleEdit = (values, { resetForm }) => {
        setLoading(true);
        CategoryService.updateCategory({ ...selectedCategory, ...values })
            .then(data => {
                console.log(data);
                fetchCategories();
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Category updated successfully.',
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update category. Please try again.',
                });
            })
            .finally(() => {
                resetForm();
                handleCloseEditCategoryModal();
                setLoading(false);
            });
    };

    // Delete Handler
    const handleDelete = (categoryId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This category will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                CategoryService.deleteCategory(categoryId)
                    .then(() => {
                        fetchCategories();
                        Swal.fire(
                            'Deleted!',
                            'The category has been deleted.',
                            'success'
                        );
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete category. Please try again.',
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    };

    return (
        <>
            <Container fluid className="vh-100 justify-content-center align-items-start admin-category-management">
                <Row className="w-100 mb-3">
                    <Col>
                        <Alert variant="primary" className="d-flex justify-content-between align-items-center">
                            <Button variant="primary" onClick={handleShowAddCategoryModal} disabled={loading}>
                                {loading ? 'Adding...' : 'Add New Category'}
                            </Button>
                            <div className="flex-grow-1 text-center">
                                <h4 className="m-0">Category Management</h4>
                            </div>
                            <Col xs={3} className="ms-3"> {/* Adjust xs value for the desired size */}
                                <Form.Control
                                    type="text"
                                    placeholder="Search categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={loading}
                                />
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
                        filteredCategories.map((category, index) => (
                            <Col sm={3} key={index}>
                                <Card style={{ width: '100%', minHeight: '200px', backgroundColor: '#cce6ff' }}>
                                    <Card.Body>
                                        <Card.Title>{category.name}</Card.Title>
                                        <Card.Text style={{ minHeight: '40px' }}>
                                            {category.description}
                                        </Card.Text>
                                        <Button variant="success" onClick={() => handleShowEditCategoryModal(category)} disabled={loading}>Edit</Button>&nbsp;&nbsp;
                                        <Button variant="danger" onClick={() => handleDelete(category.id)} disabled={loading}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>

            {/* Add Modal */}
            <Modal show={showAddCategoryModal} onHide={handleCloseAddCategoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ name: '', description: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleAdd}
                    >
                        {({ handleSubmit }) => (
                            <FormikForm onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formCategoryName">
                                    <Form.Label>Category Name</Form.Label>
                                    <Field
                                        type="text"
                                        placeholder="Enter category name"
                                        name="name"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formCategoryDescription">
                                    <Form.Label>Category Description</Form.Label>
                                    <Field
                                        type="text"
                                        placeholder="Enter category description"
                                        name="description"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </Form.Group>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseAddCategoryModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </Modal.Footer>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditCategoryModal} onHide={handleCloseEditCategoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: selectedCategory ? selectedCategory.name : '',
                            description: selectedCategory ? selectedCategory.description : ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleEdit}
                    >
                        {({ handleSubmit }) => (
                            <FormikForm onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formCategoryName">
                                    <Form.Label>Category Name</Form.Label>
                                    <Field
                                        type="text"
                                        placeholder="Enter category name"
                                        name="name"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formCategoryDescription">
                                    <Form.Label>Category Description</Form.Label>
                                    <Field
                                        type="text"
                                        placeholder="Enter category description"
                                        name="description"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </Form.Group>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditCategoryModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
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