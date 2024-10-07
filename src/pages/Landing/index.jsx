import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { AdminLoginCard, VendorLoginCard } from "./LoginCards";

export default function Landing() {
  return (
    <Container className="d-flex flex-column vh-100 justify-content-center align-items-center">
      <Row className="w-100 mb-4">
        <Col className="text-center">
          <h1 className="text-danger">ERP System</h1>
        </Col>
      </Row>
      <Row className="w-100 justify-content-center">
        <Col xs={5} className="d-flex justify-content-end"> {/* Reduce width and align to the right */}
          <AdminLoginCard />
        </Col>
        <Col xs={5} className="d-flex justify-content-start"> {/* Reduce width and align to the left */}
          <VendorLoginCard />
        </Col>
      </Row>
    </Container>
  );
}
