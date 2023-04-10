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
  //const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInSucceed, setLoggedInSucceed] = useState(false);
  
  const Signup = () => {
    axios.post("http://localhost:3000/api/users/signup", { username, password })
      .then((response) => {
        setMessage(`Your account (Username: ${username}) is created !`);
        console.log(response);
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
        //console.log(response);
        setLoggedIn(true);
        //setUserId(response.data._id);
        //console.log(response.data.token);
        setToken(response.data.token);
        console.log(username)
        context.changeLoginUser(username);
        context.changeToken(response.data.token)
        context.changeLoginState(true)
        console.log("HII")
        console.log(context.loginUser)
        console.log(context.currentToken)
        //setLoggedInSucceed(true)
      })
      .catch((error) => {
        //console.log(error);
        setMessage(error.response.data.err);
      })
      .then(() =>{
          axios
            .get('http://localhost:3000/api/orderedMeals/', {params:{username: username}})
            .then((response) => {
              console.log(username)
              context.changeCartItems(response.data)
              console.log("HAAA");
              console.log(context.loginUser)
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
    console.log(context.cartItems)
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
          <NavLink to="/"><button onClick={Logout}>Logout</button></NavLink>
          <NavLink to="/shoppingcart"><button>View Cart</button></NavLink>
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