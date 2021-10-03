import React, { useState } from 'react';
import Search from './Search';

function Login({ handleLogin, handleLogout, loggedIn, setLoggedIn, user }) {
	const [ username, setUsername ] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_name: username })
		})
			.then((response) => response.json())
			.then((user) => {
				handleLogin(user);
			});
	}

	function onLogout() {
		fetch('/logout', {
			method: 'DELETE'
		}).then(() => {
			handleLogout();
		});
	}
	console.log(loggedIn);
	if (user) {
		return <Search user={user} onLogout={onLogout} />;
	}
	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
			<button type="submit">Login</button>
			<button onClick={onLogout}>Logout</button>
		</form>
	);
}

export default Login;
