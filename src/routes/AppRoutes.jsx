import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  Landing,
  AdminDashboard,
  CSRDashboard,
  VendorDashboard,
} from "../pages";
import VendorLayout from "../layouts/VendorLayout";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/CSRDashboard" element={<CSRDashboard />} />

        {/* Vendor Layout */}
        <Route path="/*" element={<AdminLayout />}>
          <Route path="AdminDashboard" element={<AdminDashboard />} />
        </Route>

        {/* Vendor Layout */}
        <Route path="/*" element={<VendorLayout />}>
          <Route path="vendor-dashoboard" element={<VendorDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
