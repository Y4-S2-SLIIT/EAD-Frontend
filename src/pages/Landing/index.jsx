import React, { useState } from 'react'
import {
    Alert,
    Container,
    Row,
    Col,
    Button,
    Modal
} from 'react-bootstrap';

import {
    AdminLoginCard,
    VendorLoginCard
} from './LoginCards';

export default function Landing() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Container
                fluid
                className="d-flex vh-100 justify-content-center align-items-center"
            >
                <Row>
                    <Col sm={8}>
                        <Alert variant='primary'>
                            This is an alert—check it out!
                        </Alert>
                    </Col>
                    <Col sm={4}>
                        <Alert variant='primary'>
                            <Button variant="primary" onClick={handleShow}>Login</Button>{' '}
                        </Alert>
                    </Col>
                </Row>
            </Container>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <AdminLoginCard />
                        </Col>
                        <Col>
                            <VendorLoginCard />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}