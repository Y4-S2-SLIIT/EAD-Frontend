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

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/CSRDashboard" element={<CSRDashboard />} />
        <Route path="/VendorDashboard" element={<VendorDashboard />} />
      </Routes>
    </Router>
  );
}
