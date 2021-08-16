import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Navbar from './Components/Navigation/Navbar';
import { useMain } from './MainProvider';

function App() {
	const { mainState } = useMain();
	//eslint-disable-next-line
	console.log('🏠context', mainState);

	return (
		<div className="relative">
			<Navbar />

			<div>{mainState.isAuthenticated}</div>
			<div>{mainState.userId}</div>

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
