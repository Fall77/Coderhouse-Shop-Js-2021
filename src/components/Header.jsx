import React from 'react';
import './Header.css'
import Icono from './Icono'

const Header = () => {
    return (
        <div className="text-light">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="/">Store</a>
      </li>
      <li className="nav-item dropdown ">
        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Menu
             </a>
            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                <a className="dropdown-item bg-dark text-light" href="/">About</a>
                <a className="dropdown-item bg-dark text-light" href="/">Contact</a>
            <div className="dropdown-divider"></div>
                <a className="dropdown-item bg-dark text-light" href="/">Map</a>
            </div>
            </li>
        </ul>
        <Icono />
            </div>
        </nav>
    </div>
    )
}

export default Header