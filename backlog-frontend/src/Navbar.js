function Navbar({ user, onLogout }) {
	console.log(user);

	if (user) {
		return (
			<div>
				<h2>Welcome, {user.user_name}!</h2>
				<button onClick={onLogout}>Log Out</button>
			</div>
		);
	} else {
		return <h2>Please log in with your username</h2>;
	}
}

export default Navbar;
