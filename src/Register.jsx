import React,{useState} from 'react';
import "./css/register.css";
import axios from "axios";

function Register({authUser, setAuthUser}) {
  const [username, setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const register = e => {
    e.preventDefault();
    const data = JSON.stringify({username, email, password})
    axios
        .post("http://127.0.0.1:8000/account/auth/register/",data,config)
        .then(res => console.log(res))
        .catch(error => console.log(error.response.data.username));
  }
    return (
        <div>
            <div className="register">
                <form onSubmit={register}>
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUserName(e.target.value)} type="text" />
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register
