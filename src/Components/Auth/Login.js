import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { actions, useMain } from '../../MainProvider';
import axiosInstance from '../../utils/axios';
import parseJwt from '../../utils/parseJwt';
import ExitButton from './ExitButton';

const Login = () => {
	const history = useHistory();
	const { mainDispatch } = useMain();

	const initialForm = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, setFormData] = useState(initialForm);
	const [error, setError] = useState(false);

	const handleChange = (e) => {
		const input = e.target.name;
		setError(false);
		setFormData(() => {
			return { ...formData, [input]: e.target.value.trim() };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post('/user/login/', formData)
			.then((res) => {
				if (res.data.access) {
					//eslint-disable-next-line
					console.log(res);

					mainDispatch({
						type: actions.SIGNIN,
						payload: {
							accessToken: res.data.access,
							refreshToken: res.data.refresh,
							userId: parseJwt(res.data.access).user_id,
							username: parseJwt(res.data.access).username,
						},
					});
					// eslint-disable-next-line
					axiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.access}`;
					history.push(`/board/${parseJwt(res.data.access).username}`);
				}
			})
			.catch((err) => {
				// eslint-disable-next-line
				console.log(err);
				setError(true);
			});
	};

	return (
		<div className="border fixed z-50 inset-0 w-full h-screen flex justify-center items-center bg-gradient-to-r from-pink-400 to-blue-500 bg-opacity-75">
			<div className="block bg-white rounded-lg shadow-xl py-12 px-12 sm:px-24 md:px-48 flex-none lg:px-12 xl:px-12 max-w-3xl relative ">
				<ExitButton />
				<h2
					className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
				>
					Log in
				</h2>
				<div className="mt-12 w-80">
					<form onSubmit={handleSubmit}>
						<div>
							<div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-750"
								type="email"
								name="email"
								id="email"
								required
								placeholder="marky@gmail.com"
								onChange={handleChange}
							/>
						</div>
						<div className="mt-8">
							<div className="flex justify-between items-center">
								<div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
								<div>
									<a
										href="/"
										className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer"
									>
										Forgot Password?
									</a>
								</div>
							</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
								type="password"
								name="password"
								id="password"
								required
								placeholder="Enter your password"
								onChange={handleChange}
							/>
						</div>
						<div className="mt-10 relative">
							{error && (
								<span className="absolute -top-10 text-red-600">Invalid Information..</span>
							)}
							<button
								type="submit"
								className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
							>
								Log In
							</button>
						</div>
					</form>
					<div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
						Don&apos;t have an account ?{' '}
						<Link to="/register">
							<span className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
