import React, { useState, useEffect } from 'react';
import './App.css';

function Gamecontainer({ user, singleGame }) {
	const [ gamecards, setGamecards ] = useState(null);
	// const [ setEditButton ] = useState(false);
	const [ image, setImage ] = useState('');
	const [ levelData, setLevelData ] = useState('');
	const [ credPoints, setCredPoints ] = useState(0);

	function incrementCredPoints(id) {
		fetch(`/users/${id}/cred_points`, {
			method: 'PATCH',
			header: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: user.id,
				cred_points: credPoints
			})
		})
			.then((response) => response.json())
			.then((credPoint) => setCredPoints(credPoint));
	}

	useEffect(() => {
		fetch('/gamecards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image: singleGame.image,
				level_data: singleGame.title,
				user_id: user.id,
				game_id: singleGame.id
			})
		}) //this is wrong which gamecard am I using? Which level_data? Fix in the morning.
			.then((response) => response.json())
			.then((newGamecard) => {
				console.log('FETCH FIRED', newGamecard);
				setGamecards((gamecard) => newGamecard);
			});
	}, []);

	function editGame(e) {
		console.log('EDIT GAME FIRED', singleGame);
		e.preventDefault();
		fetch(`/gamecards/${gamecards.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image: image,
				level_data: levelData,
				user_id: user.id
			})
		})
			.then((response) => response.json())
			.then((updatedGameCards) => setGamecards(updatedGameCards));
	}
	console.log(gamecards);

	function inputImage(e) {
		e.preventDefault();
		return setImage(e.target.value);
	}

	function inputLevelData(e) {
		e.preventDefault();
		return setLevelData(e.target.value);
	}

	function addGameCard(e) {
		e.preventDefault();
		fetch('/gamecards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image: image,
				level_data: levelData,
				user_id: user.id,
				game_id: singleGame.id
			})
		}) //this is wrong which gamecard am I using? Which level_data? Fix in the morning.
			.then((response) => response.json())
			.then((newGamecard) => {
				setGamecards((gamecard) => newGamecard);
			});
	}

	function getGamecards() {
		return (
			<div className="Gamecard-Container">
				<h2>{singleGame.title}</h2>
				<img className="img" src={singleGame.image} />
				<img className="level-image" src={gamecards.image} alt={''} />
				<p>{gamecards.level_data}</p>
				<div className="Edit-Gamecard">
					<form onSubmit={editGame}>
						<p>Paste URL of your level</p>
						<input onChange={inputImage} type="text" name="add game image" />
						<p />
						<p>Type your note for this level</p>
						<input className="Note-Input" onChange={inputLevelData} type="text" name="Add note" />
						<div className="button-row">
							<input type="submit" />
						</div>
					</form>
				</div>
			</div>
		);
	}

	return <div>{gamecards ? getGamecards() : 'LOADING...'}</div>;
}

export default Gamecontainer;
