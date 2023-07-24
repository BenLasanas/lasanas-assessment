import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        //const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiLogin = 'https://netzwelt-devtest.azurewebsites.net/Account/SignIn';
        const response = await axios.post(apiLogin, {
          username: username,
          password: password
        });

      if (response.status === 200) {
        console.log("Login Successful");

      } else {
        console.log('Authentication failed:', response.data.message);
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error( error.message);
      setErrorMessage('Something went wrong');
    }
  };



  return (
    <div >
      <form  onSubmit={handleLogin}>
        <div >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div >
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p >{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
