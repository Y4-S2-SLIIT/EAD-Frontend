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
  OMLanding,
  PMLanding,
  AddProduct,
  AdminCategoryManagement,
  AdminOrderManagement,
  AdminVendorManagement,
  AdminSystemUserManagement,
  AdminCustomerManagement,
  AdminInventoryManagement,

  CSRCustomerManagement,
  CSROrderManagement,
  CSRCustomerDetails
} from "../pages";

import VendorLayout from "../layouts/VendorLayout";
import AdminLayout from "../layouts/AdminLayout";
import CSRLayout from "../layouts/CSRLayout";
import EditProduct from "../pages/Vendor/ProductManagement/EditProduct";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />

        {/* Admin Layout */}
        <Route path="/*" element={<AdminLayout />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="admin-category-management" element={<AdminCategoryManagement />} />
          <Route path="admin-order-management" element={<AdminOrderManagement />} />
          <Route path="admin-vendor-management" element={<AdminVendorManagement />} />
          <Route path="admin-system-user-management" element={<AdminSystemUserManagement />} />
          <Route path="admin-customer-management" element={<AdminCustomerManagement />} />
          <Route path="admin-inventory-management" element={<AdminInventoryManagement />} />
        </Route>

        {/* Vendor Layout */}
        <Route path="/vendor/*" element={<VendorLayout />}>
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="order-management" element={<OMLanding />} />
          <Route path="product-management" element={<PMLanding />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>

        {/* CSR Layout */}
        <Route path="/*" element={<CSRLayout />}>
          <Route path="csr-dashboard" element={<CSRDashboard />} />
          <Route path="csr-system-user-management" element={<CSRCustomerManagement />} />
          <Route path="csr-order-management" element={<CSROrderManagement />} />
          <Route path="csr-customer-details/:customerId" element={<CSRCustomerDetails />} /> 
        </Route>

      </Routes>
    </Router>
  );
}