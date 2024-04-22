import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './NavbarUser.css';
import { Link } from 'react-router-dom';
import Style from './Style';
import { useAuth } from './AuthContext';
 

function NavbarUser({ buttons }) {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <> 
    <Style />
    <nav className="navbar navbar-expand-lg navbar bg- p-3" style={{ backgroundColor: 'rgb(220, 42, 172)' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/" onClick={handleLogout}> Salir</a>
        <ul className="navbar-nav">
          {buttons.map((button, index) => (
            <li className="nav-item" key={index}>
              <Link to={button.link} className={`nav-link-mx-2 ${button.isActive ? 'active' : ''}`} aria-current="page">
                {button.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
    </>
  );
}

export default NavbarUser;
