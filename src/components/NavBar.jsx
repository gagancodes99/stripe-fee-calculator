import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg p-3 mb-5 bg-white rounded" >

       
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <p className="nav-item">
              <Link className="nav-link" to="/" style={{textDecoration:"none"}}>Stripe Calculator</Link>
            </p>
            <p className="nav-item">
              <Link className="nav-link" to="/tax"  style={{textDecoration:"none"}}>Tax Calculator</Link>
            </p>
          </div>
        </div>
     
    </nav>
  );
}

export default NavBar;
