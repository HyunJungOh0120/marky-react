import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import Alert from '../Forms/Alert';

const ChangePassword = () => {
	const [status, setStatus] = useState('');
	const [isClicked, setIsClicked] = useState(false);

	const initialForm = Object.freeze({
		oldPassword: '',
		password: '',
		password2: '',
	});

	const initialError = Object.freeze({
		oldPassword: false,
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
	};

	const handleBlur = (e) => {
		if (!e.target.value) {
			setErrors(() => {
				return { ...errors, [e.target.name]: 'This field is required' };
			});
		}
		if (
			e.target.name === 'password' ||
			e.target.name === 'password2' ||
			e.target.name === 'oldPassword'
		) {
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

		console.log(formData);

		axiosInstance
			.put('/user/change_password/', {
				old_password: formData.oldPassword,
				new_password: formData.password,
			})
			.then(function (res) {
				if (res.status === 204) {
					setStatus('success');
					history.push('/login');
				}
			})
			.catch(function (error) {
				if (error.response) {
					const field = error.response.data;

					if (field.old_password) {
						setErrors(() => {
							return { ...setErrors, oldPassword: field.old_password };
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

	const handleRemoveAlert = () => {
		setIsClicked(!isClicked);
	};

	return (
		<div className="border fixed z-50 inset-0 w-full h-screen flex justify-center items-center bg-gray-500 bg-opacity-75">
			{status === 'success' && (
				<Alert
					isClicked={isClicked}
					onClick={handleRemoveAlert}
					strong="Yay!"
					message="Successfully changed"
					color="green"
				/>
			)}
			<div className="bg-white rounded-lg shadow-xl  py-12 px-12 sm:px-24 md:px-48 lg:px-12 xl:px-12  relative">
				<h2
					className="text-center text-4xl text-green-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
				>
					Change Password
				</h2>
				<div className="mt-12 w-80">
					<form onSubmit={handleSubmit}>
						<div className="mt-8">
							<div className="text-sm font-bold text-gray-700 tracking-wide">Old Password</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-750"
								type="password"
								name="oldPassword"
								placeholder="Enter your old password"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.oldPassword && <span className="text-red-600">{errors.oldPassword}</span>}
						</div>
						<div className="mt-8">
							<div className="flex justify-between items-center">
								<div className="text-sm font-bold text-gray-700 tracking-wide">New Password</div>
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
								Change
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
