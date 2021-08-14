import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

function App() {
	return (
		<div className="relative">
			<Navbar />

			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
