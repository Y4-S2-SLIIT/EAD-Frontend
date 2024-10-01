import React from 'react';
import {
    Container,
    Card,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();
    return (
        <>
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center vh-100"
            >
                {/* First Row */}
                <Row className="mb-3">
                    {/* System User Management Card */}
                    <Col sm={3}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>System User Management</Card.Title>
                                <Card.Text>
                                    Manage system users.
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => {
                                        navigate('/admin-system-user-management')
                                    }}
                                >View System Users</Button>
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
                                    Manage vendors.
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
                    {/* Customer Management Card */}
                    <Col sm={3}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Customer Management</Card.Title>
                                <Card.Text>
                                    Manage customers.
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => {
                                        navigate('/admin-customer-management')
                                    }}
                                >View Customers</Button>
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
                                    Manage categories.
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
                </Row>
                {/* Second Row */}
                <Row>
                    {/* Order Management Card */}
                    <Col sm={6}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Order Management</Card.Title>
                                <Card.Text>
                                    Manage orders.
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

                    {/* Inventory Management Card */}
                    <Col sm={6}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Inventory Management</Card.Title>
                                <Card.Text>
                                    Manage Inventory.
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => {
                                        navigate('/admin-inventory-management')
                                    }}
                                >View Inventory</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}