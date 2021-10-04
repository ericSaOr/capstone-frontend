import React, { useState, useEffect } from 'react';

function Gamecontainer({ user, singleGame }) {
	const [ gamecards, setGamecards ] = useState(null);
	// const [ setEditButton ] = useState(false);
	const [ image, setImage ] = useState('');
	const [ levelData, setLevelData ] = useState('');
	const [ userId, setUserId ] = useState(0);
	const [ credPoints, setCredPoints ] = useState(0);

	// useEffect(() => {
	// 	fetch('/gamecards').then((res) => res.json()).then((gamesData) => {
	// 		setGamecards(gamesData);
	// 	});
	// }, []);

	function incrementCredPoints(e, id) {
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

	function handleGCdelete(id) {
		console.log('STRING ID FROM GCDELETE', id);
		fetch(`/gamecards/${id}`, {
			method: 'DELETE'
		})
			.then((r) => r.json())
			.then((deletedGCs) => {
				setGamecards((prevGC) => {
					const copyGamecards = [ ...prevGC ];
					const index = copyGamecards.findIndex((gc) => deletedGCs.user_id === gc.user_id);
					console.log('INDEX FROM DELETE REQUEST', index);
					copyGamecards.splice(index, 1);
					return copyGamecards;
				});
			});
	}

	function getGamecards() {
		return (
			<div>
				<img src={gamecards.image} alt={''} />
				<p>{gamecards.level_data}</p>
				<div>
					<form onSubmit={editGame}>
						<input onChange={inputImage} type="text" name="add game image" />
						<input onChange={inputLevelData} type="text" name="Add note" />
						<div className="button-row">
							<input type="submit" />
						</div>
					</form>
					<button onClick={() => handleGCdelete(gamecards.user_id)}>Delete</button>
				</div>
			</div>
		);


		
		// return gamecards.map((gc) => (<singleGame />
		// 	<div>
		// 		<img key={gc.user_id} src={gc.image} alt={''} />
		// 		<p>{gc.level_data}</p>

		// 		<div>
		// 			<form onSubmit={editGame}>
		// 				<input onChange={inputImage} type="text" name="add game image" />
		// 				<input onChange={inputLevelData} type="text" name="Add note" />
		// 				<div className="button-row">
		// 					<input type="submit" />
		// 				</div>
		// 			</form>
		// 			<button onClick={() => handleGCdelete(gc.user_id)}>Delete</button>
		// 		</div>
		// 	</div>
		// ));
	}

	// :image, :level_data, :note

	return (
		<div>
			{gamecards ? getGamecards() : 'LOADING...'}

			<form onSubmit={addGameCard}>
				<input onChange={() => inputImage} type="text" name="add gamecard image" />
				<input onChange={() => inputLevelData} type="text" name="add level data" />
				<input type="submit" />
			</form>
		</div>
	);
}

export default Gamecontainer;
