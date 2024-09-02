import React, { useState } from 'react';
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
    };

    axios.post('http://localhost:8000/register/', data)
      .then((response) => {
        setMessage('Account created successfully');
        console.log('Success', response.data);
      })
      .catch((error) => {
        setMessage('');
        console.error('Error:', error);
      }); 
    setUsername("");
    setPassword("");
    setEmail("");
    };
    

    return (
      <>
        <form onSubmit={handleRegister} id="register-form">
          <label htmlFor="register-username">Username</label>
          <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="register-username"
            required />

          <label htmlFor="register-email">Email</label>
          <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="register-email"
            required />

          <label htmlFor="register-password">Password</label>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="register-password"
            required />

          <button type="submit">Register</button>
        </form>
        <p className='notice'>Password will be hashed with PBKDF2 algorithm with a SHA256 hash</p>
      </>

    );
}

export default Register;

