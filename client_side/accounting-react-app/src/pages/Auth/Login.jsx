import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * @param {Object} setIsLoggedIn - state setter whether user has logged in or not 
 */
function Login({setIsLoggedIn}) {
	const loginUrl = 'http://localhost:8000/login/';
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const handleLogin = async (event) => {
		event.preventDefault();

		const data = {
			username: username,
			password: password 	
		};

		try {
			const res = await fetch(loginUrl, {
				method: 'POST',
				body: JSON.stringify(data)
			});
			await statusCheck(res);
			const resData = await response.json();

			localStorage.setItem('token', resData.token);

			setIsLoggedIn(true)
			navigate('/personal')
		} catch (error) {
			console.log(error);
		}
	}

	async function statusCheck(res) {
		if (!res.ok) {
			throw new Error(await res.text());
		}
		return res;
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
