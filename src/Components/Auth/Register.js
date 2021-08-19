import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import ExitButton from './ExitButton';

const Register = () => {
	const initialForm = Object.freeze({
		email: '',
		username: '',
		password: '',
		password2: '',
	});

	const initialError = Object.freeze({
		email: false,
		username: false,
		password: false,
		password2: false,
	});

	const [formData, setFormData] = useState(initialForm);
	const [errors, setErrors] = useState(initialError);

	const history = useHistory();

	const handleChange = (e) => {
		const input = e.target.name;
		setErrors(() => {
			return { ...errors, [input]: false };
		});

		setFormData(() => {
			return { ...formData, [input]: e.target.value };
		});

		// if (input === 'password') {
		// 	console.log(e.target.value);
		// }
		// if (input === 'password2') {
		// 	console.log(e.target.value);
		// }
	};

	const handleBlur = (e) => {
		if (!e.target.value) {
			setErrors(() => {
				return { ...errors, [e.target.name]: 'This field is required' };
			});
		}
		if (e.target.name === 'username') {
			if (e.target.value.length < 3) {
				setErrors(() => {
					return { ...errors, [e.target.name]: "This field's minimun length is 3" };
				});
			}
		}
		if (e.target.name === 'password' || e.target.name === 'password2') {
			if (e.target.value.length < 8) {
				setErrors(() => {
					return { ...errors, [e.target.name]: "This field's minimun length is 8" };
				});
			}
		}
	};

	const errorsArr = Object.keys(errors).map((field) => errors[field]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const validation = errorsArr.every((i) => i === false);
		if (formData.password !== formData.password2) {
			setErrors({
				...errors,
				password2: "This doesn't match with password",
			});
		}
		if (!validation) return;

		axiosInstance
			.post('/user/register/', {
				email: formData.email,
				username: formData.username,
				password: formData.password,
			})
			.then(function (res) {
				if (res.status === 201) {
					history.push('/login');
				}
			})
			.catch(function (error) {
				if (error.response) {
					const field = error.response.data;

					if (field.email) {
						setErrors(() => {
							return { ...setErrors, email: field.email };
						});
					}
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					// eslint-disable-next-line
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					// eslint-disable-next-line
					console.log('Error', error.message);
				}
			});
	};

	return (
		<div className="border fixed z-50 inset-0 w-full h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 bg-opacity-75">
			<div className="bg-white rounded-lg  shadow-xl m-3 py-9 md:py-8 px-12 md:px-48 lg:px-10 xl:px-12  relative">
				<ExitButton />
				<h2
					className="text-center text-3xl text-green-900 font-display font-semibold  md:text-5xl
                    xl:text-bold"
				>
					Register
				</h2>
				<div className="mt-12 w-80">
					<form onSubmit={handleSubmit}>
						<div>
							<div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-750"
								type="email"
								required
								name="email"
								placeholder="marky@gmail.com"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.email && <span className="text-red-600">{errors.email}</span>}
						</div>
						<div className="mt-8">
							<div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-750"
								type="text"
								name="username"
								placeholder="marky"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.username && <span className="text-red-600">{errors.username}</span>}
						</div>
						<div className="mt-8">
							<div className="flex justify-between items-center">
								<div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
							</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
								type="password"
								name="password"
								placeholder="Enter your password"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.password && <span className="text-red-600">{errors.password}</span>}
						</div>
						<div className="mt-8">
							<div className="flex justify-between items-center">
								<div className="text-sm font-bold text-gray-700 tracking-wide">
									Confirm Password
								</div>
							</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
								type="password"
								name="password2"
								placeholder="Confirm your password"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.password2 && <span className="text-red-600">{errors.password2}</span>}
						</div>
						<div className="mt-10">
							<button
								type="submit"
								className="bg-green-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-green-600
                                shadow-lg"
							>
								Register
							</button>
						</div>
					</form>
					<div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
						Already have an account ?{' '}
						<Link to="/login">
							<span className="cursor-pointer text-green-600 hover:text-green-800">Sign In</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
