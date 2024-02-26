import React from "react";
import { Link } from "react-router-dom";
import './nav.css';
function Navigate() {
  return (
    <React.Fragment>
      <nav className="topPanel">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="logo-container">
                <img src="krishibharat.png" alt="Krishi Bharat Logo" className="logo" />
                <span className="logo-text">Krishi Bharat</span>
              </div>
            </div>
            <div className="col-md-8">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/schemes" className="nav-link">
                    Schemes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-1">
              <div className="user-profile">
                <button className="profile-button">
                  <div className="user-icon"></div>
                </button>
                {/* Dropdown content */}
                <div className="dropdown-content">
                  <Link to="/user-profile">User Profile</Link>
                  <Link to="/user-dashboard">User Dashboard</Link>
                  {/* Add more links as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navigate;
