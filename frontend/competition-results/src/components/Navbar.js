import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiCalendar, FiAward, FiUser } from 'react-icons/fi';
import logo from '../assets/logosport.png';
import '../styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="Logo Sport" className="navbar-logo" />
          <span className="navbar-title">Résultats Sportifs</span>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <FiHome className="nav-icon" />
            <span>Accueil</span>
          </Link>
         
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;