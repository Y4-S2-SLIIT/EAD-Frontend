import React, { useState, useEffect } from "react";
import productImage from "../../../assets/products.jpg";
import orderImage from "../../../assets/orders.svg";
import OrderService from "../../../services/Order.Service";
import ProductService from "../../../services/Product.Service";
import NotificationService from "../../../services/Notification.Service";
import Swal from "sweetalert2";

export default function VendorDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    rejected: 0,
    accepted: 0,
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    OrderService.getOrdersByVendorId(localStorage.getItem("erp-vendorId"))
      .then((response) => {
        const total = response.length;
        let pending = 0;
        let rejected = 0;
        let accepted = 0;

        response.forEach((order) => {
          const status = order.items[0].isAccepted;
          if (status === "Accepted") {
            accepted++;
          } else if (status === "Rejected") {
            rejected++;
          } else if (status === "Pending") {
            pending++;
          }
        });

        setOrderStats({ total, pending, rejected, accepted });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

    ProductService.getProductsByVendorId(localStorage.getItem("erp-vendorId"))
      .then((response) => {
        setProductCount(response.length);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    NotificationService.getNotificationsByVendorId(
      localStorage.getItem("erp-vendorId")
    )
      .then((response) => {
        setNotifications(response);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const handleProductManagementClick = () => {
    localStorage.setItem("erp-nav", "vendor-product-management");
    window.location.href = "/vendor/product-management";
  };

  const handleOrderManagementClick = () => {
    localStorage.setItem("erp-nav", "vendor-order-management");
    window.location.href = "/vendor/order-management";
  };

  const handleDeleteNotification = (id, stock) => {
    if (stock > 5) {
      // Call the notification delete API (if applicable)
      NotificationService.deleteNotification(id)
        .then(() => {
          setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting notification:", error);
        });
    } else {
      Swal.fire({
        title: "Warning",
        text: "You cannot delete this notification. Please restock the product first.",
        icon: "warning",
      });
    }
    console.log("Delete notification with ID:", id);
  };

  return (
    <div className="container mt-4">
      <div className="row" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        {/* First Container */}
        <div className="col-md-6 mb-4">
          <div className="card text-center">
            <img
              src={productImage}
              className="card-img-top mx-auto mt-4"
              alt="..."
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text">
                You have {productCount} products in your inventory.
              </p>
              <button
                onClick={handleProductManagementClick}
                className="btn btn-primary"
              >
                View Products
              </button>
            </div>
          </div>
        </div>

        {/* Second Container */}
        <div className="col-md-6 mb-4">
          <div className="card text-center">
            <img
              src={orderImage}
              className="card-img-top mx-auto mt-4"
              style={{ maxHeight: "200px", maxWidth: "200px" }}
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Your Orders</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item text-center">
                  Total Orders: {orderStats.total}
                </li>
                <li className="list-group-item text-center">
                  Pending: {orderStats.pending}
                </li>
                <li className="list-group-item text-center">
                  Rejected: {orderStats.rejected}
                </li>
                <li className="list-group-item text-center">
                  Accepted: {orderStats.accepted}
                </li>
              </ul>
              <button
                className="btn btn-primary mt-3"
                onClick={handleOrderManagementClick}
              >
                View Orders
              </button>
            </div>
          </div>
        </div>

        {/* Third Container for Notifications */}
        <div className="col-md-12">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              {notifications.length > 0 ? (
                notifications
                  .slice()
                  .reverse()
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="notification-item d-flex justify-content-between align-items-center mb-2"
                    >
                      <div className="d-flex align-items-center">
                        <span className="text-danger" style={{ marginRight: "8px" }}>
                          ●
                        </span>
                        <span>
                          You have low stocks on{" "}
                          <strong>{notification.productDetails.name}</strong>.
                        </span>
                        <span>
                          {" "}
                          | ID:{" "}
                          <strong>{notification.productDetails.id}</strong>.
                          Please restock!
                        </span>
                        <img
                          src={notification.productDetails.image}
                          alt={notification.productDetails.name}
                          style={{ maxHeight: "40px", marginLeft: "10px" }}
                        />
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteNotification(
                            notification.id,
                            notification.productDetails.stock
                          )
                        }
                        className="btn text-danger"
                        style={{ fontSize: "24px", marginLeft: "10px", padding: "0" }}
                      >
                        &times; {/* Cross icon for deletion */}
                      </button>
                    </div>
                  ))
              ) : (
                <p className="card-text">
                  You have no new notifications at the moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
