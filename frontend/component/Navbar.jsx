import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../src/store/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import './styles/Navbar.css';

const Navbar = () => {
  const { isLoggedIn, LogoutUser } = useContext(AuthContext);

  console.log('isLoggedIn:', isLoggedIn); // Debug log

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo and Brand */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/AnnaSamarpan-removebg-preview.png" // Updated image path
            alt="Logo"
            className="logo img-fluid me-2"
            style={{ height: '40px' }}
          />
          <span className="brand-title">AnnaSamarpan</span>
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
              </li>
            )}
            {/* Login / Signup Section inside menu */}
            <li className="nav-item d-lg-none">
              {isLoggedIn ? (
                <NavLink className="nav-link text-danger" to="/logout" onClick={LogoutUser}>
                  Logout
                </NavLink>
              ) : (
                <>
                  <NavLink className="nav-link text-primary" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link text-primary" to="/signup">
                    Signup
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>

        {/* Desktop Login / Signup Section */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          {isLoggedIn ? (
            <NavLink className="nav-link text-danger" to="/logout" onClick={LogoutUser}>
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink className="nav-link text-primary" to="/login">
                Login
              </NavLink>
              <span className="text-secondary">/</span>
              <NavLink className="nav-link text-primary" to="/signup">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;