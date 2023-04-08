import React, { useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import '../css/User.css';

const Users = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const Signup = () => {
    axios.post("http://localhost:3000/api/users/signup", { username, password })
      .then((response) => {
        setMessage(`Your account (${username}) is created !`);
        //console.log(response);
      })
      .catch((error) => {
        //console.log(error);
        setMessage(error.response.data.err);
      });
  };

  const Login = () => {
    axios.post("http://localhost:3000/api/users/login", { username, password })
      .then((response) => {
        setMessage("");
        console.log(response);
        setLoggedIn(true);
        setUserId(response.data._id);
        setToken(response.data.token);
      })
      .catch((error) => {
        //console.log(error);
        setMessage(error.response.data.err);
      });
  };

  const Logout = () => {
    setLoggedIn(false);
    setShowLogin(false);
    setUsername("");
    setPassword("");
  }
  const Get = () => {
    axios.get("http://localhost:3000/api/users/", {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const ShowLoginSystem = () => {
    setShowLogin(true);
    setMessage("");
  }

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Welcome, {username} !</h2>
          <button onClick={Logout}>Logout</button>
          <button onClick={Get}>Get</button>
          <NavLink to="/shoppingcart"><button>Go to Your Shopping Cart</button></NavLink>
        </div>
      ) : (
        <div>
          {showLogin ? (
            <div className="myaccountbtndetails">
              <input
                className="login"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="login"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {message.length > 0 && <p> {message} </p>}
              <div className="myaccountbuttons">
                <button onClick={Signup}>Sign Up</button>
                <button onClick={Login}>Login</button>
              </div>
            </div>
          ) : (
            <div>
              <button className="myaccountbtn" onClick={ShowLoginSystem}>My Account</button>
            </div>
          )
          }
        </div>
      )}
    </div>
  )


}

export default Users;