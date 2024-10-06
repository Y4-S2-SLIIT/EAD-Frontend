import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import Sidebar from "../../components/CSRSideBar";

// Register all Chart.js components
Chart.register(...registerables);

const CsrDashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleToggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const data = {
    labels: ["Sep 10", "Sep 11", "Sep 12", "Sep 13", "Sep 14", "Sep 15", "Sep 16"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(0, 123, 255, 0.6)",
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear' // Define the type explicitly
      },
      x: {
        beginAtZero: true // Optional for x-axis
      }
    },
    plugins: {
      legend: {
        display: true // Optionally display the legend
      }
    }
  };

  return (
    <div className="full-height-page">
      <Sidebar expanded={sidebarExpanded} toggleSidebar={handleToggleSidebar} />
      <div className={`content-wrapper ${sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
        <Container fluid>
          <Row className="mb-4">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Abandoned Cart</Card.Title>
                  <Card.Text>
                    20% <Badge bg="warning">-40%</Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Customers</Card.Title>
                  <Card.Text>
                    30 <Badge bg="success">+80%</Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Active</Card.Title>
                  <Card.Text>
                    1,180 <Badge bg="danger">-40%</Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Card.Title>Sales Summary</Card.Title>
                  <Bar data={data} options={options} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Recent Orders</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      iPhone 13 <Badge bg="secondary">Pending</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      iPhone 13 <Badge bg="success">Completed</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      iPhone 13 <Badge bg="secondary">Pending</Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CsrDashboard;
