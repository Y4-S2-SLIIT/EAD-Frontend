import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import Sidebar from "../../../components/CSRSideBar";
import customerService from "../../../services/Customer.Service";
import "../../../styles/csrCustomerDetails.css";

const CSRCustomerDetails = () => {
  const { customerId } = useParams(); // Get the customer ID from the URL
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomerDetails = async () => {
    try {
      const data = await customerService.getCustomerById(customerId);
      setCustomer(data);
    } catch (error) {
      console.error("Failed to fetch customer details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, [customerId]);

  return (
    <div className="full-height-page">
      <Sidebar expanded={true} />
      <div className="content-wrapper sidebar-expanded">
        <Container
          fluid
          className="full-height-container"
          id="page-content-wrapper"
        >
          <Row className="full-height-row">
            <Col className="content-area">
              {loading ? (
                <div>Loading customer details...</div>
              ) : (
                customer && (
                  <>
                    <Row className="mb-4">
                      <Col>
                        <Card>
                          <Card.Body>
                            <Card.Title>
                              {customer.firstName} {customer.lastName}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              Email: {customer.email}
                            </Card.Subtitle>
                            <Card.Text>Phone: {customer.phone}</Card.Text>
                            <Card.Text>Address: {customer.address}</Card.Text>
                            <Card.Text>
                              Status:{" "}
                              <span
                                style={{
                                  color: customer.isDeactivated
                                    ? "red"
                                    : "green",
                                }}
                              >
                                {customer.isVerified
                                  ? customer.isDeactivated
                                    ? "Deactivated"
                                    : "Active"
                                  : "New"}
                              </span>
                            </Card.Text>
                            {!customer.isVerified && customer.isDeactivated && (
                              <Button variant="primary">Accept</Button>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h4>Transaction History</h4>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Product/Item</th>
                              <th>Total Price</th>
                              <th>Status</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Mock data for demonstration */}
                            {customer.orders.map((order) => (
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.item}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.status}</td>
                                <td>
                                  {new Date(order.date).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <Button
                      as={Link}
                      to="/csr-system-user-management"
                      className="mt-3"
                    >
                      Back to Customer Management
                    </Button>
                  </>
                )
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CSRCustomerDetails;
