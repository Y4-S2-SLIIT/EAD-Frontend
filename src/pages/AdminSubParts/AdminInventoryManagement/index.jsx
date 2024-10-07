import React, { useState, useEffect } from 'react';
import {
    Alert,
    Container,
    Row,
    Col,
    Button,
    Spinner,
    Card,
    Modal
} from 'react-bootstrap';
import VendorService from '../../../services/Vendor.Service';
import ProductService from '../../../services/Product.Service';

export default function AdminInventoryManagement() {
    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // State for controlling the modal
    const [selectedVendor, setSelectedVendor] = useState(null); // State to track the selected vendor

    async function getVendors() {
        setLoading(true);
        try {
            const response = await VendorService.getAllVendors();
            setVendors(response);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        } finally {
            setLoading(false);
        }
    }

    async function getProductsByVendorId(id) {
        try {
            const response = await ProductService.getProductsByVendorId(id);
            setProducts(response);
            setShowModal(true); // Show the modal once products are fetched
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getVendors();
    }, []);

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Container fluid className="vh-100 justify-content-center align-items-start admin-category-management">
                <Row className="w-100 mb-3">
                    <Col>
                        <Alert variant="primary" className="d-flex justify-content-between align-items-center">
                            <div className="flex-grow-1 text-center">
                                <h4 className="m-0">Inventory Management</h4>
                            </div>
                        </Alert>
                    </Col>
                </Row>

                <Row className="g-4">
                    {loading ? (
                        <Col className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    ) : (
                        <>
                            {/* Map through vendors */}
                            {vendors.map((vendor) => (
                                <Col key={vendor.id} md={6} lg={4}>
                                    <Card style={{ width: '100%', minHeight: '200px', backgroundColor: '#cce6ff' }}>
                                        <Card.Body>
                                            <Card.Title>{vendor.name}</Card.Title>
                                            <Card.Text style={{ minHeight: '40px' }}>
                                                Contact: {vendor.phone}
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    setSelectedVendor(vendor); // Track selected vendor
                                                    getProductsByVendorId(vendor.id);
                                                }}>
                                                View Products
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </>
                    )}
                </Row>

                {/* Modal for displaying products */}
                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Products from {selectedVendor?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="g-4">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <Col key={product.id} md={6} lg={4}>
                                        <Card>
                                            <Card.Img
                                                variant="top"
                                                src={product.image}
                                                alt={product.name}
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                            <Card.Body>
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text>Price: ${product.price}</Card.Text>
                                                <Card.Text>Quantity: {product.stock}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col>
                                    <p>No items added by this vendor.</p>
                                </Col>
                            )}
                        </Row>
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