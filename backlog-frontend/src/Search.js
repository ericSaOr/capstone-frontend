import React, { useState, useEffect } from 'react';

function Search({ user }) {
	const [ games, setGames ] = useState([]);
	const [ setImage ] = useState('');
	const [ setTitle ] = useState('');

	useEffect(() => {
		const url = '/games';
		fetch(url).then((res) => res.json()).then((gamesData) => {
			setGames(gamesData);
		});
	}, []);
	function getGames() {
		return games.map((g) => (
			<div>
				<p>{g.title}</p>
				<img
					src={g.image}
					onClick={() => {
						console.log('hi');
					}}
				/>
				<button onClick={handleDelete}>Delete</button>
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
			body: JSON.stringify({ image: games.image, title: games.title })
		})
			.then((response) => response.json())
			.then((newGame) => {
				setGames((game) => [ ...game, newGame ]);
			});
	}

	function setImageInput(e) {
		return setImage(e.target.value);
	}

	function setTitleInput(e) {
		return setTitle(e.target.value);
	}

	function handleDelete(id) {
		fetch(`/games/${id}`, {
			method: 'DELETE'
		})
			.then((r) => r.json())
			.then((deletedGames) => {
				setGames((prevGames) => {
					const copyGames = [ ...prevGames ];
					const index = copyGames.findIndex((game) => deletedGames.id === game.id);
					console.log('INDEX FROM DELETE REQUEST', index);
					copyGames.splice(index, 1);
					return copyGames;
				});
			});
	}

	return (
		<div>
			<h2>Pick from the available games</h2>
			<h3>Add a Game</h3>
			{getGames()}
			<form onSubmit={addGame}>
				<input onChange={() => setImageInput} type="text" name="add game image" />
				<input onChange={() => setTitleInput} type="text" name="Add game titel" />
				<div className="button-row">
					<input type="submit" />
				</div>
			</form>
		</div>
	);
}

export default Search;
