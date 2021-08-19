import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticleDetail from './Components/Articles/ArticleDetail';
import ChangePassWord from './Components/Auth/ChangePassWord';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import BoardPage from './Components/Pages/BoardPage';
import MyPage from './Components/Pages/MyPage';
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
				<Route path="/change-password">
					<ChangePassWord />
				</Route>
				<Route path="/register">
					<Register />
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
			</Switch>
		</div>
	);
}

export default App;
