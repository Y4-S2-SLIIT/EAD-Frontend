import React, { useState } from 'react'
import {
    Alert,
    Container,
    Row,
    Col,
    Button,
    Modal
} from 'react-bootstrap';

export default function AdminInventoryManagement() {
    return (
        <>
            <Container
                fluid
                className="d-flex vh-100 justify-content-center align-items-center"
            >
                <Row>
                    <Col>
                        <Alert variant='primary'>
                            Admin Inventory Management
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
