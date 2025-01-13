import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../src/store/Auth';

const Navbar = () => {
  const { isLoggedIn, LogoutUser } = useContext(AuthContext);

  return (
    <header className="navbar-header">
      <div className="navbar-container container">
        <div className="navbar-brand">
          <NavLink to="/" className="brand-link">
            <div className="logo-wrapper">
              <img src="../public/AnnaSamarpan-removebg-preview.png" alt="Logo" />
            </div>
            <span className="brand-title">AnnaSamarpan</span>
          </NavLink>
        </div>

        <div className="nav-toggle" onClick={() => document.querySelector('.navbar-links').classList.toggle('active')}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className="navbar-links">
          <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            {isLoggedIn && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout" onClick={LogoutUser}>Logout</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
                <span>/</span>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
