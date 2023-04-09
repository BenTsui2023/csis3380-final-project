import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import Desserts from "./Desserts";
import Pastas from "./Pastas";
import Beef from "./Beef";
import NotFound from "./NotFound";
import ProductDetails from "./ProductDetails";
import Users from "./Users";
import Filter from './Filter';
import '../css/App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='header'><p>3380 Prairie Sky Cafe</p></div>
        <div className='users'>
        <Users />
        </div>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Desserts" element={<Desserts />} />
            <Route path="/Pastas" element={<Pastas />} />
            <Route path="/Beef" element={<Beef />} />
            <Route path="/ProductDetails/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
