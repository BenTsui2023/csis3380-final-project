import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const NavBar = () => (
  <div className='NavBar'>
    {/* <ul className="main-nav">
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/burgers">Burgers</NavLink></li>
      <li><NavLink to="/pizzas">Pizzas</NavLink></li>
      <li><NavLink to="/drinks">Drinks</NavLink></li>
    </ul>     */}
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About title="About" />} />
        <Route path="/burgers" element={<Burgers />} />
        <Route path="/pizzas" element={<Pizzas />} />
        <Route path="/drinks" element={<Drinks />} />
    </Routes>
  </div>
);

export default NavBar;