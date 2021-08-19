import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticleDetail from './Components/Articles/ArticleDetail';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Board from './Components/Pages/BoardPage';
import { useMain } from './MainProvider';

function App() {
	const { mainState } = useMain();

	return (
		<div className="relative container mx-auto px-4 md:container md:mx-auto max-w-prose  ">
			<Switch>
				<Route exact path="/">
					<div className="bg-blue-200">home</div>
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/board/:username">
					<Board />
				</Route>
				<Route path="/article/:articleId">
					<ArticleDetail />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
