import React from "react";
import './Dashboard.css';


const NavBar=()=>{
    return(
       <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navbarToggleExternalContent" data-bs-theme="dark">
      <div className="container-fluid">
        <h1><a className="navbar-brand" href="/"> MyFinBank</a></h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="/about">About us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/features">Features</a>
            </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Banking
          </a>
        <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/login">Login</a></li>
                <li><a className="dropdown-item" href="/register">Registration</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>  
)
}
export default NavBar;
