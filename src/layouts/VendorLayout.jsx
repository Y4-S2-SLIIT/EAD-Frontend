import React from "react";
import { Footer, VendorNavBar } from "../components";
import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <div>
      <VendorNavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default VendorLayout;
