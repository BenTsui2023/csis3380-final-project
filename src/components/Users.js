import React, { useState, useContext } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import UserContext from '../context/user-context';
import '../css/User.css';

const Users = () => {
  const context = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const Signup = () => {
    axios.post("http://localhost:3000/api/users/signup", { username, password })
      .then((response) => {
        setMessage(`Your account (Username: ${username}) is created !`);
        console.log(response);
      })
      .catch((error) => {
        setMessage(error.response.data.err);
      });
  };

  const Login = () => {
    axios.post("http://localhost:3000/api/users/login", { username, password })
      .then((response) => {
        setMessage("");
        setLoggedIn(true);
        context.changeLoginUser(username);
        context.changeToken(response.data.token)
        context.changeLoginState(true)
      })
      .catch((error) => {
        setMessage(error.response.data.err);
      })
      .then(() => {
        axios
          .get('http://localhost:3000/api/orderedMeals/', { params: { username: username } })
          .then((response) => {
            context.changeCartItems(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      })
  };

  const Logout = () => {
    setLoggedIn(false);
    setShowLogin(false);
    setUsername("");
    setPassword("");
    context.changeLoginState(false)
    context.changeLoginUser("")
    context.changeToken("")
    context.changeCartItems([])
  }

  const ShowLoginSystem = () => {
    setShowLogin(true);
    setMessage("");
  }

  return (
    <div className="welcomeSet">
      {loggedIn ? (
        <div className="welcome">
          <h2>Welcome, {username}!</h2>
          <div className="welcomeBtn">
            <NavLink to="/"><button className="userBtn" onClick={Logout}>Logout</button></NavLink>
            <NavLink to="/shoppingcart"><button className="userBtn">View Cart</button></NavLink>
          </div>
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
              <div className="userMessage">
                {message.length > 0 && <p> {message} </p>}
              </div>
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