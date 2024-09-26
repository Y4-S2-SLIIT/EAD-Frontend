import React, { useState, useEffect } from 'react';
import {
    Alert,
    Container,
    Row,
    Col,
    Card,
    Button
} from 'react-bootstrap';
import CategoryService from '../../../services/Category.Service';

export default function AdminCategoryManagement() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories()
            .then(data => {
                console.log(data);
                setCategories(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Container
                fluid
                className="vh-100 justify-content-center align-items-start admin-category-management"
            >
                <Row className="w-100 mb-3">
                    <Col>
                        <Alert variant="primary" className="d-flex justify-content-between align-items-center">
                            <div className="flex-grow-1 text-center m-0">
                                <h4 className="m-0">Category Management</h4>
                            </div>
                            <Button variant="primary">Add New Category</Button>
                        </Alert>
                    </Col>
                </Row>

                <Row className="g-4">
                    {categories.map((category, index) => (
                        <Col sm={3} key={index}>
                            <Card style={{ width: '100%', minHeight: '200px', backgroundColor: '#cce6ff' }}>
                                <Card.Body>
                                    <Card.Title>{category.name}</Card.Title>
                                    <Card.Text>
                                        {category.description}
                                    </Card.Text>
                                    <Button variant="success">Edit</Button>&nbsp;&nbsp;
                                    <Button variant="danger">Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}