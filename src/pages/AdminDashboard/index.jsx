import React, { useState } from 'react'
import {
    Alert,
    Container,
    Card,
    Row,
    Col,
    Button,
    Modal
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();
    return (
        <>
            <Container
                fluid
                className="d-flex vh-100 justify-content-center align-items-center"
            >
                <Row>
                    {/* System User Management Card */}
                    <Col sm={3}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>System User Management</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => {
                                        navigate('/admin-system-user-management')
                                    }}>View System Users</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Vendor Management Card */}
                    <Col sm={3}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Vendor Management</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => {
                                        navigate('/admin-vendor-management')
                                    }}
                                >View Vendors</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Category Management Card */}
                    <Col sm={3}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Category Management</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => {
                                        navigate('/admin-category-management')
                                    }}
                                >View Categories</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Order Management Card */}
                    <Col sm={3}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Order Management</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => {
                                        navigate('/admin-order-management')
                                    }}
                                >View Orders</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <></>
        </>
    )
}
