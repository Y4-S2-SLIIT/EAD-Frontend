import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import {
    Landing,
    AdminDashboard,
    CSRDashboard,
    VendorDashboard
} from "../pages";

import {
    NavBar,
    Footer
} from "../components";

function Layout({ children }) {
    const location = useLocation();
    const hideNavbarFooter = location.pathname === "/";

    return (
        <>
            {!hideNavbarFooter && <NavBar />}
            {children}
            {!hideNavbarFooter && <Footer />}
        </>
    );
}

export default function AppRoutes() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/CSRDashboard" element={<CSRDashboard />} />
                    <Route path="/VendorDashboard" element={<VendorDashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}