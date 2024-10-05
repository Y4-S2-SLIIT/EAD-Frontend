import React from "react";
import { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import Sidebar from "../../../components/CSRSideBar";

const CSROrderManagement = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const handleToggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const orders = [
    {
      id: 302012,
      product: "Handmade Pouch",
      date: "29 Dec 2022",
      customer: "John Bushmill",
      total: "$121.00",
      payment: "Mastercard",
      status: "Processing",
    },
    {
      id: 302011,
      product: "Smartwatch E2",
      date: "24 Dec 2022",
      customer: "Linda Blair",
      total: "$590.00",
      payment: "Visa",
      status: "Delivered",
    },
    // Add more orders as needed...
  ];

  return (
    <div className="full-height-page">
      {" "}
      {/* Wrapper to fill the page */}
      <Sidebar expanded={sidebarExpanded} toggleSidebar={handleToggleSidebar} />
      <div
        className={`content-wrapper ${
          sidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
      ></div>
      <Table responsive="sm" striped bordered hover>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Product</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.product}</td>
            <td>{order.date}</td>
            <td>{order.customer}</td>
            <td>{order.total}</td>
            <td>{order.payment}</td>
            <td>
              <Badge bg={order.status === 'Delivered' ? 'success' : order.status === 'Processing' ? 'warning' : 'secondary'}>
                {order.status}
              </Badge>
            </td>
            <td>
              <Button variant="outline-primary" size="sm">Edit</Button>{' '}
              <Button variant="outline-danger" size="sm">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default CSROrderManagement;
