import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
	const [ game, setGame ] = useState([]);

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

	fetch(' https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games', {
		method: 'POST',
		// mode: 'no-cors',
		// credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'Client-ID': 'qo929iiu0q6pa38ydrfdxj37li80a9',
			Authorization: 'Bearer a5301d0q3f2p8cin945szap6feme04'
		},
		body: 'search "Witcher";  fields name, status;'
	})
		.then((response) => response.json())
		.then((data) => console.log(data));

	console.log(game);

	return (
		<div className="App">
			<Login />
      <Gamecontainer />
		</div>
	);
}

export default App;
