import React from "react";
import { Link } from "react-router-dom"; // Import Link

const FooterSection = () => {
  let currentYear = new Date().getFullYear();
  return (
    <footer className="py-4 text-center" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="container">
        <p className="text-muted mb-2">© {currentYear} FoodShare. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-4">
          <Link to="/about" className="text-dark text-decoration-none">About Us</Link>
          <Link to="/contact" className="text-dark text-decoration-none">Contact</Link>
          <Link to="/privacy" className="text-dark text-decoration-none">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
