import React from "react";
import { Footer, VendorNavBar } from "../components";
import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <VendorNavBar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default VendorLayout;
