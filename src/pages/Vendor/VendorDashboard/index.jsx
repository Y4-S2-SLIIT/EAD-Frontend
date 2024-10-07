import React, { useState, useEffect } from "react";
import productImage from "../../../assets/products.jpg";
import orderImage from "../../../assets/orders.svg";
import OrderService from "../../../services/Order.Service";
import ProductService from "../../../services/Product.Service";

export default function VendorDashboard() {
  const [productCount, setProductCount] = useState(0); // Example product count
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    rejected: 0,
    accepted: 0,
  });

  useEffect(() => {
    OrderService.getOrdersByVendorId(localStorage.getItem("erp-vendorId"))
      .then((response) => {
        const total = response.length; // Total number of orders
        let pending = 0;
        let rejected = 0;
        let accepted = 0;

        // Calculate statistics based on isAccepted status
        response.forEach((order) => {
          const status = order.items[0].isAccepted; // Assuming there's always one item in the order
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

    // Fetch product count by vendor ID
    ProductService.getProductsByVendorId(localStorage.getItem("erp-vendorId"))
        .then((response) => {
            setProductCount(response.length);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
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

  return (
    <div className="container mt-4">
      <div className="row">
        {/* First Container */}
        <div className="col-md-6 mb-4">
          <div className="card text-center">
            <img
              src={productImage}
              className="card-img-top mx-auto mt-4" // Center image
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
              className="card-img-top mx-auto mt-4" // Center image
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
      </div>
    </div>
  );
}
