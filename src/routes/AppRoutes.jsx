import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Landing,
  AdminDashboard,
  CSRDashboard,
  VendorDashboard,
  OMLanding,
  PMLanding,
  AddProduct,
} from "../pages";
import VendorLayout from "../layouts/VendorLayout";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/CSRDashboard" element={<CSRDashboard />} />

        {/* Admin Layout */}
        <Route path="/*" element={<AdminLayout />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Vendor Layout */}
        <Route path="/vendor/*" element={<VendorLayout />}>
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="order-management" element={<OMLanding />} />
          <Route path="product-management" element={<PMLanding />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}
