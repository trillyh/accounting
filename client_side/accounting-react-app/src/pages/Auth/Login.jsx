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
	async function handleLogin() {
		event.preventDefault();

		const data = {
			username: username,
			password: password 	
		};

		try {
			const res = await fetch(loginUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			await statusCheck(res);
			const resData = await res.json();

			localStorage.setItem('token', resData.token);

			setIsLoggedIn(true)
			navigate('/personal')
		} catch (error) {
			console.log(error);
		} finally {
			setUsername('')
			setPassword('')
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
			<input
				type="text"
				id="login-username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>

			<label htmlFor="login-password">Password</label>
			<input
				type="password"
				id="login-password"
				value={password} // Controlled input
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<button type="submit">Log In</button>
		</form>
	);
}

export default Login;
