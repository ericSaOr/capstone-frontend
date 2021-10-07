import './App.css';

function Navbar({ user, handleLogout }) {
	console.log(user);
	function onLogout() {
		fetch('/logout', {
			method: 'DELETE'
		}).then(() => {
			handleLogout();
		});
	}
	if (user) {
		return (
			<div>
				<h2>Welcome, UserName: {user.user_name}!</h2>
				<button onClick={onLogout}>Log Out</button>
			</div>
		);
	} else {
		return (
			<div className="Title">
				<h1>Backlog Tracker</h1>
				<h2>Please log in with your username</h2>
			</div>
		);
	}
}

export default Navbar;
