import React, { useState, useEffect } from 'react';
import {
    Alert,
    Container,
    Row,
    Col,
    Button,
    Modal,
    Spinner,
    Card,
    Carousel,
    Dropdown,
} from 'react-bootstrap';
import OrderService from '../../../services/Order.Service';
import CustomerService from '../../../services/Customer.Serivce';
import ProductService from '../../../services/Product.Service';
import VendorService from '../../../services/Vendor.Service';

export default function AdminOrderManagement() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [vendors, setVendors] = useState([]);
    const [newStatus, setNewStatus] = useState(null); // For selected new delivery status
    const [vendorLoading, setVendorLoading] = useState(false); // Loading state for vendor details
    const [updatingStatus, setUpdatingStatus] = useState(false); // Loading state for status update

    // Fetch all orders and map customer names and delivery address
    async function fetchOrders() {
        setLoading(true);
        try {
            const data = await OrderService.getAllOrders();
            const ordersWithCustomerDetails = await Promise.all(data.map(async order => {
                const customer = await CustomerService.getCustomerById(order.customerId);
                return {
                    ...order,
                    customerName: `${customer.firstName} ${customer.lastName}`,
                    deliveryAddress: customer.address,
                };
            }));
            setOrders(ordersWithCustomerDetails);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetch vendor details and related product information for the selected order
    async function fetchVendorDetails(order) {
        setVendorLoading(true); // Start loading
        const vendorDetails = await Promise.all(order.items.map(async item => {
            const vendor = await VendorService.getVendorById(item.venderId);
            const products = await Promise.all(item.orderItems.map(async orderItem => {
                const product = await ProductService.getProductById(orderItem.productId);
                return {
                    ...orderItem,
                    productName: product.name,
                    price: product.price,
                    image: product.image,
                };
            }));
            return {
                vendorName: vendor.data.name,
                products: products,
                item: item,
            };
        }));
        setVendors(vendorDetails);
        setVendorLoading(false); // Stop loading
    }

    // Handle viewing the selected order details
    function handleViewOrder(order) {
        setSelectedOrder(order);
        fetchVendorDetails(order);
    }

    // Handle closing the modal
    function handleCloseModal() {
        setSelectedOrder(null);
        setVendors([]);
        setNewStatus(null); // Reset new status when closing modal
    }

    // Update the order status
    async function updateOrderStatus() {
        if (selectedOrder && newStatus) {
            setUpdatingStatus(true); // Start loading for status update

            //update the order status
            const updatedOrder = ({ ...selectedOrder, deliveryStatus: newStatus });

            try {
                await OrderService.updateOrder(selectedOrder.id, updatedOrder);
                fetchOrders(); // Refresh orders after update
                handleCloseModal(); // Close the modal
            } catch (error) {
                console.log(error, "Failed to update order status");
            } finally {
                setUpdatingStatus(false); // Stop loading
            }
        } else {
            Alert.alert("Warning", "Please select a new status.");
        }
    }

    return (
        <>
            <Container fluid className="vh-100 justify-content-center align-items-start admin-category-management">
                <Row className="w-100 mb-3">
                    <Col>
                        <Alert variant="primary" className="d-flex justify-content-between align-items-center">
                            <div className="flex-grow-1 text-center">
                                <h4 className="m-0">Order Management</h4>
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
                            {orders.map((order, index) => (
                                <Col sm={3} key={index}>
                                    <Card style={{ width: '100%', minHeight: '200px', backgroundColor: '#cce6ff' }}>
                                        <Card.Body>
                                            <Card.Title>Order Date: {order.placedDate}</Card.Title>
                                            <Card.Text style={{ minHeight: '40px' }}>
                                                Customer: {order.customerName} <br />
                                                Total: ${order.total} <br />
                                                Status: {order.deliveryStatus}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleViewOrder(order)}>View Order</Button>&nbsp;&nbsp;
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </>
                    )}
                </Row>

                {/* Modal to View Order Details */}
                <Modal show={selectedOrder !== null} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedOrder && (
                            <>
                                <h5>Customer: {selectedOrder.customerName}</h5>
                                <h6>Delivery Address: {selectedOrder.deliveryAddress}</h6>
                                <h6>Total: ${selectedOrder.total}</h6>
                                <h6>Status: {selectedOrder.deliveryStatus}</h6>
                                <hr />
                                <h5>Update Delivery Status</h5>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {newStatus ? newStatus : "Select Status"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setNewStatus("Pending")}>Pending</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setNewStatus("Shipped")}>Shipped</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setNewStatus("Delivered")}>Delivered</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setNewStatus("Cancelled")}>Cancelled</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button
                                    variant="primary"
                                    onClick={updateOrderStatus}
                                    className="mt-2"
                                    disabled={updatingStatus} // Disable button during update
                                >
                                    {updatingStatus ? <Spinner animation="border" size="sm" /> : "Update Status"}
                                </Button>
                                <hr />
                                <h5>Vendors & Products</h5>

                                {vendorLoading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading vendors...</span>
                                    </Spinner>
                                ) : (
                                    vendors.map((vendor, idx) => (
                                        <div key={idx}>
                                            <h6>Vendor: {vendor.vendorName}</h6>
                                            <h6>Is Accepted: {vendor.item.isAccepted ? 'Accepted' : 'Not Accepted'}</h6>
                                            <Carousel variant="dark">
                                                {vendor.products.map((product, productIdx) => (
                                                    <Carousel.Item key={productIdx}>
                                                        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '200px' }}>
                                                            <Row>
                                                                <Col>
                                                                    <h5>{product.productName}</h5>
                                                                    <p>Quantity: {product.quantity}</p>
                                                                    <p>Price: ${product.price}</p>
                                                                </Col>
                                                                <Col>
                                                                    <img src={product.image} alt={product.productName} style={{ maxHeight: '150px' }} />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                            <hr />
                                        </div>
                                    ))
                                )}
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}