import React, { useState } from 'react';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password 
    }

  }
  return (
    <form onSubmit={handleLogin} id="login-form">
      <label htmlFor="login-username">Username</label>
      <input type="text" id="login-username" required />
      
      <label htmlFor="login-password">Password</label>
      <input type="password" id="login-password" required />
      
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;