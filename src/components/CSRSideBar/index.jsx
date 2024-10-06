import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaTachometerAlt, FaShoppingCart, FaUsers, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link
import PropTypes from 'prop-types'; // Import PropTypes
import './sideBar.css';

const Sidebar = ({ expanded, toggleSidebar }) => {
    return (
        <div className={`sidebar-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
            {/* Move toggle button to the top left corner */}
            <Button onClick={toggleSidebar} className="toggle-button-sidebar">
                {expanded ? <FaChevronLeft /> : <FaChevronRight />}
            </Button>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/csr-dashboard">
                    <FaTachometerAlt className="sidebar-icon" />
                    {expanded && "Dashboard"}
                </Nav.Link>
                <Nav.Link as={Link} to="/csr-order-management">
                    <FaShoppingCart className="sidebar-icon" />
                    {expanded && "Order Management"}
                </Nav.Link>
                <Nav.Link as={Link} to="/csr-system-user-management">
                    <FaUsers className="sidebar-icon" />
                    {expanded && "Customer Management"}
                </Nav.Link>
                <Nav.Link as={Link} to="/report">
                    <FaFileAlt className="sidebar-icon" />
                    {expanded && "Report"}
                </Nav.Link>
            </Nav>
        </div>
    );
};

// Define prop types
Sidebar.propTypes = {
    expanded: PropTypes.bool.isRequired, 
    toggleSidebar: PropTypes.func.isRequired, 
};

export default Sidebar;
