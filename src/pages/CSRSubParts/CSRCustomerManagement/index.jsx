import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation
import Sidebar from "../../../components/CSRSideBar";
import "../../../styles/csrCustomerManagement.css";
import customerService from "../../../services/Customer.Service";
import Swal from "sweetalert2";

const CSRCustomerManagement = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  useEffect(() => {
    const fetchCustomers = () => {
      customerService
        .getAllCustomers()
        .then((data) => {
          setCustomers(data);
        })
        .catch((error) => {
          console.error("Failed to fetch customers", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCustomers();
  }, []);

  const handleAcceptCustomer = (customerId) => {
    customerService
      .updateCustomer(customerId, { isVerified: true, isDeactivated: false })
      .then(() => {
        Swal.fire("Success!", "Customer has been accepted!", "success");
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === customerId
              ? { ...c, isVerified: true, isDeactivated: false }
              : c
          )
        );
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to accept the customer!", "error");
      });
  };

  const handleReactivateCustomer = (customerId) => {
    customerService
      .updateCustomer(customerId, { isDeactivated: false })
      .then(() => {
        Swal.fire("Success!", "Customer has been re-activated!", "success");
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === customerId ? { ...c, isDeactivated: false } : c
          )
        );
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to re-activate the customer!", "error");
      });
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !customer.isDeactivated && customer.isVerified) ||
      (filter === "inactive" &&
        customer.isDeactivated &&
        customer.isVerified) ||
      (filter === "new" && !customer.isVerified && customer.isDeactivated);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="full-height-page">
      <Sidebar expanded={sidebarExpanded} toggleSidebar={handleToggleSidebar} />
      <div
        className={`content-wrapper ${
          sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
      >
        <Container
          fluid
          className="full-height-container"
          id="page-content-wrapper"
        >
          <Row className="full-height-row">
            <Col className="content-area">
              <Row className="mb-4 align-items-center">
                <Col md={4} className="d-flex">
                  <ButtonGroup className="me-3 w-100">
                    <Button
                      variant={filter === "all" ? "primary" : "outline-primary"}
                      onClick={() => setFilter("all")}
                      className={`toggle-button w-100 ${
                        filter === "all" ? "active" : ""
                      }`}
                    >
                      All
                    </Button>
                    <Button
                      variant={
                        filter === "active" ? "primary" : "outline-primary"
                      }
                      onClick={() => setFilter("active")}
                      className={`toggle-button w-100 ${
                        filter === "active" ? "active" : ""
                      }`}
                    >
                      Active
                    </Button>
                    <Button
                      variant={
                        filter === "inactive" ? "primary" : "outline-primary"
                      }
                      onClick={() => setFilter("inactive")}
                      className={`toggle-button w-100 ${
                        filter === "inactive" ? "active" : ""
                      }`}
                    >
                      Inactive
                    </Button>
                    <Button
                      variant={filter === "new" ? "primary" : "outline-primary"}
                      onClick={() => setFilter("new")}
                      className={`toggle-button w-100 ${
                        filter === "new" ? "active" : ""
                      }`}
                    >
                      New
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col md={8}>
                  <Form.Group controlId="search" className="float-end">
                    <Form.Control
                      type="text"
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-bar"
                    />
                  </Form.Group>
                </Col>
              </Row>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <Row>
                  {filteredCustomers.map((customer) => (
                    <Col key={customer.id} md={4} className="mb-3 d-flex">
                      <Card className="flex-fill">
                        <Card.Body className="d-flex flex-column align-items-center">
                          <Card.Title>
                            {customer.firstName} {customer.lastName}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            <span
                              style={{
                                color: customer.isVerified
                                  ? customer.isDeactivated
                                    ? "red"
                                    : "green"
                                  : "orange",
                              }}
                            >
                              {customer.isVerified
                                ? customer.isDeactivated
                                  ? "Deactivated Account"
                                  : "Active Account"
                                : "New Account"}
                            </span>
                          </Card.Subtitle>
                          <ListGroup className="mb-3 w-100">
                            <ListGroup.Item>
                              Email: {customer.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Phone: {customer.phone}
                            </ListGroup.Item>
                          </ListGroup>
                          <Button
                            as={Link}
                            to={`/csr-customer-details/${customer.id}`}
                            variant="link"
                            className="mt-auto"
                          >
                            See More
                          </Button>
                          {customer.isVerified && customer.isDeactivated && (
                            <Button
                              variant="success"
                              className="mb-2"
                              onClick={() =>
                                handleReactivateCustomer(customer.id)
                              }
                            >
                              Re-activate
                            </Button>
                          )}
                          {!customer.isVerified && customer.isDeactivated && (
                            <Button
                              variant="primary"
                              className="mb-2"
                              onClick={() => handleAcceptCustomer(customer.id)}
                            >
                              Accept
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CSRCustomerManagement;
