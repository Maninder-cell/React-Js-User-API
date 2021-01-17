import React, { useState, useEffect } from "react";
import "./css/login.css";
import "axios";
import axios from "axios";

function Login({ authUser, setAuthUser }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `token ${token}`;
      axios
        .get("http://127.0.0.1:8000/account/auth/user/", config)
        .then((res) => {
          setAuthUser(res.data);
          console.log(res);
        })
        .catch((error) => {
            const check = error.response.data.detail
            if (check === "Invalid token."){
                localStorage.removeItem("token");
            }
        });
    }
  }, []);

  const login = (e) => {
    e.preventDefault();
    const data = JSON.stringify({ username, password });
    axios
      .post("http://127.0.0.1:8000/account/auth/logIn/", data, config)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setAuthUser(res.data.user);
      })
      .catch((error) => console.log(error.response.data.non_field_errors));
  };

  const logout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `token ${token}`;
      axios
        .post("http://127.0.0.1:8000/account/auth/logout/",null,config)
        .then((res) => {
          setAuthUser(null)
          localStorage.removeItem("token")
        })
        .catch((error) => console.log(error.response.data))
    }
  }

  return (
    <div>
      <div className="nav">
        {authUser ? (
          <div>
            <button onClick={logout}>LogOut</button>
            <strong>{authUser.username}</strong>
          </div>
        ) : (
          <strong>None</strong>
        )}
      </div>
      <form onSubmit={login}>
        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
