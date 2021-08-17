import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Navbar from './Components/Navigation/Navbar';
import MyPage from './Components/Pages/MyPage';
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
			<div>{mainState.username}</div>
			<div>{localStorage.getItem('access_token')}</div>

			<Switch>
				<Route exact path="/">
					<div>home</div>
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/board/:username">
					<MyPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
