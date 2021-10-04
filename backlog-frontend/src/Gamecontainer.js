import React, { useState, useEffect } from 'react';

function Gamecontainer({ user }) {
	const [ gamecards, setGamecards ] = useState([]);
	const [ editButton, setEditButton ] = useState(false);
	const [ Image, setImage ] = useState('');
	const [ levelData, setLevelData ] = useState('');
	const [ userID, setUserId ] = useState(0);

	useEffect(() => {
		fetch('/gamecards').then((res) => res.json()).then((gamesData) => {
			setGamecards(gamesData);
		});
	}, []);

	function editGame(e) {
		e.preventDefault();
		fetch('/gamecards/:id', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image: gamecards.Image,
				level_data: gamecards.levelData,
				user_id: gamecards.user_id
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

	function inputID(e) {
		e.preventDefault();
		return setUserId(e.target.value);
	}
	function addGameCard(e) {
		e.preventDefault();
		fetch('/gamecards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image: gamecards.image,
				level_data: gamecards.level_data,
				user_id: gamecards.user_id
			})
		}) //this is wrong which gamecard am I using? Which level_data? Fix in the morning.
			.then((response) => response.json())
			.then((newGamecard) => {
				setGamecards((gamecard) => [ ...gamecard, newGamecard ]);
			});
	}

	function getGamecards() {
		return gamecards.map((gc) => (
			<div>
				<img key={gc.user_id} src={gc.image} alt={''} />
				<p>{gc.level_data}</p>
				<div>
					<form onSubmit={editGame}>
						<input onChange={() => inputImage} type="text" name="add game image" />
						<input onChange={() => inputLevelData} type="text" name="Add note" />
						<input onChange={() => inputID} type="number" name="add user ID" />
						<div className="button-row">
							<input type="submit" />
						</div>
					</form>
				</div>
			</div>
		));
	}

	// :image, :level_data, :note

	return (
		<div>
			{getGamecards()}

			<form onSubmit={addGameCard}>
				<input onChange={() => inputImage} type="text" name="add gamecard image" />
				<input onChange={() => inputLevelData} type="text" name="add level data" />
				<input onChange={() => inputID} type="number" name="add user_id" />
				<input type="submit" />
			</form>
		</div>
	);
}

export default Gamecontainer;
