import React, { useState, useEffect } from 'react';

function Search({ user }) {
	const [ games, setGames ] = useState([]);

	useEffect(() => {
		const url = '/games';
		fetch(url).then((res) => res.json()).then((gamesData) => {
			setGames(gamesData);
		});
	}, []);
	function getGames() {
		return games.map((g) => (
			<div>
				<img
					src={g.image}
					onClick={() => {
						console.log('hi');
					}}
				/>
			</div>
		));
	}
	console.log(games);

	function addGame(e) {
		e.preventDefault();
		fetch('/games', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ image: games.image, id: user.user_name })
		})
			.then((response) => response.json())
			.then((game) => {
				setGames(game);
			});
	}

	return (
		<div>
			<h2>Pick from the available games</h2>
			<h3>Add a Game</h3>
			{getGames()}
		</div>
	);
}

export default Search;
