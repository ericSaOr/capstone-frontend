import React, { useState, useEffect } from 'react';
import Gamecards from './Gamecards';
import {Route, Switch, History} from "react-router-dom"

function Games({ user }) {
	const [ games, setGames ] = useState([]);
	const [ image, setImage ] = useState('');
	const [ title, setTitle ] = useState('');
	const [ isClicked, setIsClicked ] = useState(false);
	const [ singleGame, setSingleGame ] = useState([]);

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
				<img key={g.id} src={g.image} alt={''} />
				<button onClick={() => handleDelete(g.id)}>Delete</button>
				<button onClick={() => getClickedGame(g.id)}>Add Game</button>

				<form onSubmit={addGame}>
				<input onChange={setImageInput} type="text" name="add game image" />
				<input onChange={setTitleInput} type="text" name="Add game title" />
				<div className="button-row">
					<input type="submit" />
				</div>
			</form>
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
			body: JSON.stringify({ image: image, title: title })
		})
			.then((response) => response.json())
			.then((newGame) => {
				setGames((game) => [ ...game, newGame ]);
			});
	}

	function getClickedGame(id) {
		console.log('GET CLICKED GAME', id);
		fetch(`/show/${id}`).then((res) => res.json()).then((game) => {
			setSingleGame(game);
			setIsClicked(true);
		});
	}
	console.log(singleGame);
	function setImageInput(e) {
		console.log('FIRED', e.target.value);
		return setImage(e.target.value);
	}

	function setTitleInput(e) {
		return setTitle(e.target.value);
	}

	function handleDelete(id) {
		console.log('STRING ID', id);
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

	if (isClicked === true) {

		return <Gamecards singleGame={singleGame} user={user} />;
	}

	return {getGames()}
	
	
	
}

export default Games;
