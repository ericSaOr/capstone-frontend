import React, { useState } from 'react';
import Search from './Search';
import './App.css';

function Login({ handleLogin, loggedIn, setLoggedIn, user, games }) {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				credentials: 'include'
			},
			body: JSON.stringify({ user_name: username, password: password })
		})
			.then((response) => response.json())
			.then((user) => {
				handleLogin(user);
			});
	}

	console.log(loggedIn);
	if (user) {
		return <Search user={user} />;
	}
	return (
		<div className="Log-in">
			<form onSubmit={handleSubmit}>
				<p>Username</p>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				<br />
				<p></p>
				<button className="login-button" type="submit">
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
