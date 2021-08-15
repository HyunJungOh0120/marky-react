import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Navbar from './Components/Navigation/Navbar';
import { useMain, actions } from './MainProvider';
import axiosInstance from './utils/axios';
import parseJwt from './utils/parseJwt';

function App() {
	const { mainState, mainDispatch } = useMain();
	//eslint-disable-next-line
	console.log('🏠context', mainState);

	useEffect(() => {
		axiosInstance.post('/user/login/refresh/').then((res) => {
			// eslint-disable-next-line
			console.log(res);
			const parsedJwt = parseJwt(res.data.access);
			mainDispatch({
				type: actions.SIGNIN,
				payload: {
					userId: parsedJwt.user_id,
					accessToken: res.data.access,
					exp: parsedJwt.exp * 1,
				},
			});
		});
	}, []);

	return (
		<div className="relative">
			<Navbar />

			<div>{mainState.isAuthenticated}</div>
			<div>{mainState.userId}</div>
			<div>{mainState.accessToken}</div>
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
