import React from 'react';

const FooterSection = () => {
  return (
    <footer className="py-4 text-center" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container">
        <p className="text-muted mb-2">© 2023 FoodShare. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-4">
          <a href="/about" className="text-dark text-decoration-none">About Us</a>
          <a href="/contact" className="text-dark text-decoration-none">Contact</a>
          <a href="/privacy" className="text-dark text-decoration-none">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;