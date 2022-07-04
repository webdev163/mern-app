import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    auth.logout();
    navigate('/');
  }
  return (
    <nav>
      <div className="nav-wrapper blue lighten-1">
        <span className="brand-logo">Link shortener</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/links">Links</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}