import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { AuthContext } from '../assets/context/AuthContext'; // Import the AuthContext

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Get the user and logout function from AuthContext

  return (
    <header className="bg-primary">
      <nav className="navbar navbar-expand-lg navbar-light">
        {/* Logo and Church name on the left */}
        <NavLink className="navbar-brand text-white d-flex align-items-center" to="/home">
          <img src={logo} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
          <span>Deeper Christian Life Ministry (IPSWICH)</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-white active" : "nav-link text-white"
                }
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-white active" : "nav-link text-white"
                }
                to="/about"
              >
                About Us
              </NavLink>
            </li>

            {/* Ministries Dropdown */}
            <li className="nav-item dropdown">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link dropdown-toggle text-white active" : "nav-link dropdown-toggle text-white"
                }
                to="/ministries"
                id="ministriesDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Ministries
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="ministriesDropdown">
                <NavLink className="dropdown-item" to="/ministries/children">
                  Children Ministry
                </NavLink>
                <NavLink className="dropdown-item" to="/ministries/youth">
                  Youth Ministry
                </NavLink>
                <NavLink className="dropdown-item" to="/ministries/women">
                  Women Ministry
                </NavLink>
                <NavLink className="dropdown-item" to="/ministries/young-adult">
                  Young Adult & Young Professional Ministry
                </NavLink>
                <NavLink className="dropdown-item" to="/ministries/evangelistic">
                  Evangelistic Ministry
                </NavLink>
              </div>
            </li>

            {/* Sermons Dropdown */}
            <li className="nav-item dropdown">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link dropdown-toggle text-white active" : "nav-link dropdown-toggle text-white"
                }
                to="/sermons"
                id="sermonsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sermons
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="sermonsDropdown">
                <NavLink className="dropdown-item" to="/sermons">
                  All Sermons
                </NavLink>
                
                {/* Conditionally show "Add Sermon" if user is logged in */}
                {user && (
                  <NavLink className="dropdown-item" to="/sermons/add">
                    Add Sermon
                  </NavLink>
                )}
              </div>
            </li>

            {/* Events Dropdown */}
            <li className="nav-item dropdown">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link dropdown-toggle text-white active" : "nav-link dropdown-toggle text-white"
                }
                to="/events"
                id="eventsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Events
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="eventsDropdown">
                <NavLink className="dropdown-item" to="/events">
                  All Events
                </NavLink>

                {/* Conditionally show "Add Event" if user is logged in */}
                {user && (
                  <NavLink className="dropdown-item" to="/events/add">
                    Add Event
                  </NavLink>
                )}
              </div>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-white active" : "nav-link text-white"
                }
                to="/giving"
              >
                Giving
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link text-white active" : "nav-link text-white"
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>

            {/* Conditionally show login/logout based on user's authentication status */}
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link text-white active" : "nav-link text-white"
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link text-white active" : "nav-link text-white"
                    }
                    to="/signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link text-white btn btn-link" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
