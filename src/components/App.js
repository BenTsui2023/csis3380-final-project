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
import ShoppingCart from "./ShoppingCart"
import UserContext from '../context/user-context';
import '../css/App.css';


function App() {
  const [loginUser, setLoginUser] = useState("");
  //const [loginUserId, setLoginUserId] = useState("123");
  const [currentToken, setCurrentToken] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [loggedInSucceed, setLoggedInSucceed] = useState(false);

  const changeLoginUser = (newUsername) => {
    setLoginUser(newUsername);
    console.log("called");
    console.log(loginUser);
  };

  // const changeLoginUserId = (newUserId) => {
  //   setLoginUserId(newUserId);
  //   console.log("called");
  //   console.log(loginUser);
  // };
  const changeCartItems = (newCartItem) => {
    setCartItems(newCartItem);
    console.log("changed");
    //console.log(cartItems);
  };

  const changeToken = (newToken) => {
    setCurrentToken(newToken);
    console.log("called Token");
    //console.log(currentToken);
  };

  const changeLoginState = (newState) => {
    setLoggedInSucceed(newState);
    console.log("changed state");
    //console.log(currentToken);
  };

  const userContextValue = {
    loginUser,
    //loginUserId,
    currentToken,
    cartItems,
    loggedInSucceed,
    changeLoginUser,
    //changeLoginUserId
    changeToken,
    changeCartItems,
    changeLoginState
  };

  return (
    <UserContext.Provider value={userContextValue}> 
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
              <Route path="/shoppingcart" element={<ShoppingCart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
