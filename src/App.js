import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ArticleDetail from './Components/Articles/ArticleDetail';
import ChangePassWord from './Components/Auth/ChangePassWord';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import BoardPage from './Components/Pages/BoardPage';
import LadingPage from './Components/Pages/LadingPage';
import MyPage from './Components/Pages/MyPage';
import { useMain } from './MainProvider';

function PrivateRoute({ children, ...rest }) {
	const { mainState } = useMain();
	return (
		<Route
			// eslint-disable-next-line
			{...rest}
			render={({ location }) => {
				return mainState.isAuthenticated === true ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
}

PrivateRoute.propTypes = {
	children: PropTypes.node,
};

function App() {
	return (
		<div className="relative container bg-gray-50 mx-auto px-4 md:container md:mx-auto max-w-prose  ">
			<Switch>
				<Route exact path="/">
					<LadingPage />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<PrivateRoute>
					<Route path="/change-password">
						<ChangePassWord />
					</Route>
					<Route path="/my-page/:username">
						<MyPage />
					</Route>
					<Route path="/board/:username">
						<BoardPage />
					</Route>
					<Route path="/article/:articleId">
						<ArticleDetail />
					</Route>
				</PrivateRoute>

				<Redirect from="*" to="/" />
			</Switch>
		</div>
	);
}

export default App;
