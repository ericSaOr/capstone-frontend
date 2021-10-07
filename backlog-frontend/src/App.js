import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
	const [ user, setUser ] = useState(null);
	const [ loggedIn, setLoggedIn ] = useState(false);
	document.body.style.backgroundColor = '#d5e2e3';
	function handleLogin(user) {
		setUser(user);
	}

	function handleLogout() {
		setUser(null);
	}

	return (
		<div>
			<Navbar loggedIn={loggedIn} handleLogout={handleLogout} user={user} />
			<Switch>
				<Route exact path="/">
					<Login
						handleLogin={handleLogin}
						handleLogout={handleLogout}
						user={user}
						loggedIn={loggedIn}
						setLoggedIn={setLoggedIn}
					/>
				</Route>
			</Switch>
		</div>
	);
}

export default App;

// const [ game, setGame ] = useState([]);

// const requestOptions = {
// 	method: 'POST',
// 	headers: { 'Content-Type': 'application/json' },
// 	body: JSON.stringify({
// 		client_id: 'qo929iiu0q6pa38ydrfdxj37li80a9',
// 		client_secret: '7e03sesomro1stz37it3qkcivnsccg',
// 		grant_type: 'client_credentials'
// 	})
// };
// fetch(
// 	'https://id.twitch.tv/oauth2/token?client_=qo929iiu0q6pa38ydrfdxj37li80a9&client_secret=7e03sesomro1stz37it3qkcivnsccg&grant_type=client_credentials&scope=',
// 	requestOptions
// )
// 	.then((response) => response.json())
// 	.then((data) => console.log(data));

// fetch(' https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games', {
// 	method: 'POST',
// 	// mode: 'no-cors',
// 	// credentials: 'same-origin',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'Client-ID': 'qo929iiu0q6pa38ydrfdxj37li80a9',
// 		Authorization: 'Bearer a5301d0q3f2p8cin945szap6feme04'
// 	},
// 	body: 'search "Witcher";  fields name, status;'
// })
// 	.then((response) => response.json())
// 	.then((data) => console.log(data));

// console.log(game)
