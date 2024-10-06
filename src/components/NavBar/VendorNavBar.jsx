import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const VendorNavBar = () => {
  const [activeNav, setActiveNav] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedNav = localStorage.getItem("erp-nav");
    if (storedNav) {
      setActiveNav(storedNav);
    } else {
      setActiveNav("vendor-dashboard");
    }
  }, []);

  const handleNavigation = (navItem, url) => {
    setActiveNav(navItem);
    localStorage.setItem("erp-nav", navItem);
    navigate(url);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a
          className="navbar-brand text-danger cursor-pointer"
          onClick={() => handleNavigation("vendor-dashboard", "/vendor/dashboard")}
        >
          ERP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/vendor/dashboard"
                className={`nav-link cursor-pointer ${
                  activeNav === "vendor-dashboard" ? "active" : "inactive-nav"
                }`}
                onClick={() => handleNavigation("vendor-dashboard", "/vendor/dashboard")}
              >
                Vendor Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/vendor/product-management"
                className={`nav-link cursor-pointer ${
                  activeNav === "vendor-product-management" ? "active" : "inactive-nav"
                }`}
                onClick={() => handleNavigation("vendor-product-management", "/vendor/product-management")}
              >
                Product Management
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/vendor/order-management"
                className={`nav-link cursor-pointer ${
                  activeNav === "vendor-order-management" ? "active" : "inactive-nav"
                }`}
                onClick={() => handleNavigation("vendor-order-management", "/vendor/order-management")}
              >
                Order Management
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default VendorNavBar;
