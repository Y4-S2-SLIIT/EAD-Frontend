import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-2 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>ERP System</h5>
            <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-unstyled">
              <li><a href="#privacy" className="text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="text-white">Terms of Service</a></li>
              <li><a href="#contact" className="text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
