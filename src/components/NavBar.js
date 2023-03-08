import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <ul className="main-nav">
      <li><NavLink >Home</NavLink></li>
      <li><NavLink >Burgers</NavLink></li>
      <li><NavLink >Pizzas</NavLink></li>
      <li><NavLink >Drinks</NavLink></li>
      {/* <li><NavLink to="/burgers">Burgers</NavLink></li>
      <li><NavLink to="/pizzas">Pizzas</NavLink></li>
      <li><NavLink to="/drinks">Drinks</NavLink></li> */}
    </ul>    
  </header>
);

export default Header;