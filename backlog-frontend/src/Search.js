import React, { useState, useEffect } from 'react';
import Gamecontainer from './Gamecontainer';

function Search({ user }) {
	const [ games, setGames ] = useState([]);
	const [ setImage ] = useState('');
	const [ setTitle ] = useState('');
	const [ isClicked, setIsClicked ] = useState(false);
	const [ singleGame, setSingleGame ] = useState([]);
	const [ setID ] = useState(0);
	const [search, setSearch]= useState('')

	useEffect(() => {
		const url = '/games';
		fetch(url).then((res) => res.json()).then((gamesData) => {
			setGames(gamesData);
		});
	}, []);


	function gameFilter (){
		if (search.length > 0){
		  return games.filter(game =>game.title.toLowerCase().includes(search));
		}
	
		return games.map((g) => (
			<div>
				<p>{g.title}</p>
				<img
					key={g.id}
					src={g.image}
					alt={''}
					onClick={() => {
						setIsClicked(true);
					}}
				/>
				<button onClick={handleDelete}>Delete</button>
				<button onClick={getClickedGame}>Add Game</button>
			</div>
		));;
	
	  }
	// function getGames() {
	// 	return games.map((g) => (
	// 		<div>
	// 			<p>{g.title}</p>
	// 			<img
	// 				key={g.id}
	// 				src={g.image}
	// 				alt={''}
	// 				onClick={() => {
	// 					setIsClicked(true);
	// 				}}
	// 			/>
	// 			<button onClick={handleDelete}>Delete</button>
	// 			<button onClick={getClickedGame}>Add Game</button>
	// 		</div>
	// 	));
	// }
	console.log(games);

	function addGame(e) {
		e.preventDefault();
		fetch('/games', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				
			},
			body: JSON.stringify({ image: games.image, title: games.title, id: user.first, key: user.id })
		})
			.then((response) => response.json())
			.then((newGame) => {
				setGames((game) => [ ...game, newGame ]);
			});
	}

	function getClickedGame(id) {
		fetch(`/games/:id`).then((res) => res.json()).then((game) => {
			setSingleGame(game);
		});
	}
	console.log(singleGame);
	function setImageInput(e) {
		return setImage(e.target.value);
	}

	function setTitleInput(e) {
		return setTitle(e.target.value);
	}

	function setIdInput(e) {
		return setID(e.target.value);
	}


	const searchGames = (searchGame)=> setSearch(searchGame);

	

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

	if (isClicked === true) {
		return <Gamecontainer />;
	}

	return (
		<div>
			<div className="filter">
			<input
				id="search-bar"
				type="text"
				placeholder="Search Notes"
				onChange={(e) => searchGames(e.target.value)}
			/>
		</div>
			<h2>Pick from the available games</h2>
			<h3>Add a Game</h3>
			{/* {getGames()} */}
			{gameFilter()}
			<form onSubmit={addGame}>
				<input onChange={() => setImageInput} type="text" name="add game image" />
				<input onChange={() => setTitleInput} type="text" name="Add game title" />
				<input onChange={() => setIdInput} type="number" name="Add user ID" label="ID" />
				<div className="button-row">
					<input type="submit" />
				</div>
			</form>
		</div>
	);
}

export default Search;
