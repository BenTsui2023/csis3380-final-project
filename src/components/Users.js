import React, { useState } from "react";
import axios from "axios";

const Users = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

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
  return (
    <div>
        {loggedIn ? (
            <div>
                <h2>Welcome, {username} !</h2>
                <button onClick={Logout}>Logout</button>
                <button onClick={Get}>Get</button>
            </div>
        ):(
            <div>
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

                <button onClick={Signup}>Sign Up</button>
                <button onClick={Login}>Login</button>
            </div>
        )}    
    </div>
  )


}

export default Users;