import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import {
  Landing,
  AdminDashboard,
  CSRDashboard,
  VendorDashboard,

  AdminCategoryManagement,
  AdminOrderManagement,
  AdminVendorManagement,
  AdminSystemUserManagement
} from "../pages";

import VendorLayout from "../layouts/VendorLayout";
import AdminLayout from "../layouts/AdminLayout";
import CSRLayout from "../layouts/CSRLayout";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/CSRDashboard" element={<CSRDashboard />} />

        {/* Admin Layout */}
        <Route path="/*" element={<AdminLayout />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="admin-category-management" element={<AdminCategoryManagement />} />
          <Route path="admin-order-management" element={<AdminOrderManagement />} />
          <Route path="admin-vendor-management" element={<AdminVendorManagement />} />
          <Route path="admin-system-user-management" element={<AdminSystemUserManagement />} />
        </Route>

        {/* Vendor Layout */}
        <Route path="/*" element={<VendorLayout />}>
          <Route path="vendor-dashboard" element={<VendorDashboard />} />
        </Route>

        {/* CSR Layout */}
        <Route path="/*" element={<CSRLayout />}>
          <Route path="csr-dashboard" element={<CSRDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}