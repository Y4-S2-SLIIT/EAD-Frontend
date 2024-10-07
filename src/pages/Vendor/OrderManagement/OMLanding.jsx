import React, { useEffect, useState } from "react";
import OrderService from "../../../services/Order.Service";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const OMLanding = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);

  useEffect(() => {
    // Fetch orders by vendor ID
    OrderService.getOrdersByVendorId(localStorage.getItem("erp-vendorId"))
      .then((response) => {
        // Filter orders into pending, accepted, and rejected categories
        const pending = [];
        const accepted = [];
        const rejected = [];

        response.forEach((order) => {
          order.items.forEach((item) => {
            if (item.isAccepted === "Pending") {
              pending.push(order);
            } else if (item.isAccepted === "Accepted") {
              accepted.push(order);
            } else if (item.isAccepted === "Rejected") {
              rejected.push(order);
            }
          });
        });

        setPendingOrders(pending);
        setAcceptedOrders(accepted);
        setRejectedOrders(rejected);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const calculateSubtotal = (item) => {
    return item.productDetails.price * item.quantity;
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => {
      return (
        total +
        item.orderItems.reduce((subtotal, orderItem) => {
          return subtotal + calculateSubtotal(orderItem);
        }, 0)
      );
    }, 0);
  };

  const handleAccept = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        OrderService.updateVendorOrderStatus(
          orderId,
          localStorage.getItem("erp-vendorId"),
          "Accepted"
        )
          .then(() => {
            Swal.fire(
              "Accepted!",
              "The order has been accepted.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error("Error accepting order:", error);
          });
      }
    });
  };

  const handleDecline = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to decline this order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Decline it!",
    }).then((result) => {
      if (result.isConfirmed) {
        OrderService.updateVendorOrderStatus(
          orderId,
          localStorage.getItem("erp-vendorId"),
          "Rejected"
        )
          .then(() => {
            Swal.fire(
              "Rejected!",
              "The order has been rejected.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error("Error accepting order:", error);
          });
      }
    });
  };

  const renderOrders = (orders, title) => (
    <div className="mb-4">
      <h3 className="mb-4">{title}</h3>
      {orders.length === 0 ? (
        <p>No {title.toLowerCase()} available.</p>
      ) : (
        orders
          .slice()
          .reverse()
          .map((order, orderIndex) => {
            const orderTotal = calculateOrderTotal(order);
            const hasAccepted = order.items.some(
              (item) => item.isAccepted === "Accepted"
            );
            const hasRejected = order.items.some(
              (item) => item.isAccepted === "Rejected"
            );
            // Determine order status
            let statusLabel;
            if (hasAccepted) {
              statusLabel = "Accepted"; // Accepted
            } else if (hasRejected) {
              statusLabel = "Rejected"; // Rejected
            } else {
              statusLabel = "Pending"; // Pending
            }
            return (
              <div className="card mb-4" key={orderIndex}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="card-title">Order ID: {order.id}</h5>
                      <div className="d-flex flex-column">
                        <p className="mb-1">
                          <strong>Placed Date:</strong> {order.placedDate}
                        </p>
                        <p className="mb-1">
                          <strong>Expected Delivery Date:</strong>{" "}
                          {order.deliveryDate.split(" ")[0]}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`badge ${
                          statusLabel === "Accepted"
                            ? "bg-success"
                            : statusLabel === "Rejected"
                            ? "bg-danger"
                            : "bg-warning"
                        }`}
                        style={{ margin: "10px" }}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Buttons are now in a separate row below the badge */}
                  {!hasAccepted && !hasRejected && (
                    <div className="mt-3">
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleAccept(order.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDecline(order.id)}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  <div className="table-responsive my-2">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Image</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) =>
                          item.orderItems.map((orderItem, index) => (
                            <tr key={index}>
                              <td>{orderItem.productDetails.name}</td>
                              <td>
                                {orderItem.productDetails.image ? (
                                  <img
                                    src={orderItem.productDetails.image}
                                    alt={orderItem.productDetails.name}
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <span>No Image</span>
                                )}
                              </td>
                              <td>{orderItem.quantity}</td>
                              <td>
                                $
                                {orderItem.productDetails.price.toLocaleString()}
                              </td>
                              <td>
                                ${calculateSubtotal(orderItem).toLocaleString()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p className="card-text text-end">
                    <strong>Order Total:</strong> ${orderTotal.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
      )}
    </div>
  );

  return (
    <div className="container mt-4 overflow-auto" style={{ maxHeight: "80vh" }}>
      {renderOrders(pendingOrders, "Pending Orders")}
      {renderOrders(acceptedOrders, "Accepted Orders")}
      {renderOrders(rejectedOrders, "Rejected Orders")}
    </div>
  );
};

export default OMLanding;
