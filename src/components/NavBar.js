import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => (
  <div className='NavBar'>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/burgers">Burgers</NavLink></li>
      <li><NavLink to="/pizzas">Pizzas</NavLink></li>
      <li><NavLink to="/drinks">Drinks</NavLink></li>
    </ul>
  </div>
);

export default NavBar;