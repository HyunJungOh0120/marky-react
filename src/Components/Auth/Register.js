import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
		// eslint-disable-next-line
		console.log('hihi');

		// TODO submit
	};

	return (
		<div className="border absolute inset-0 w-full h-screen flex justify-center items-center bg-gray-500 bg-opacity-75">
			<div className="bg-white rounded-lg shadow-xl  py-12 px-12 sm:px-24 md:px-48 lg:px-12 xl:px-12  relative">
				<ExitButton />
				<h2
					className="text-center text-4xl text-green-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
				>
					Register
				</h2>
				<div className="mt-12 w-80">
					<form onSubmit={handleSubmit}>
						<div>
							<div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-750"
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
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-750"
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
