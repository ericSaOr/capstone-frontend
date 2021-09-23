import logo from './logo.svg';
import './App.css';

function App() {
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

	fetch(' https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/search', {
		method: 'POST',
		// mode: 'no-cors',
		// credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'Client-ID': 'qo929iiu0q6pa38ydrfdxj37li80a9',
			Authorization: 'Bearer a5301d0q3f2p8cin945szap6feme04'
		},
		body: JSON.stringify({ alternative_name: 'Mario' })
	})
		.then((response) => response.json())
		.then((data) => console.log(data));

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
