import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../../utils/axios';
import Alert from './Alert';
import Loading from './Loading';

const ScrapForm = ({ className }) => {
	const initialForm = Object.freeze({
		url_address: '',
		status: 'SECRET',
	});

	const queryClient = useQueryClient();

	const [formData, setFormData] = useState(initialForm);

	const [isClicked, setIsClicked] = useState(false);

	const handleChange = (e) => {
		const { target } = e;
		const { name } = target;
		setIsClicked(false);

		if (target.type === 'checkbox') {
			const value = target.checked ? 'PUBLIC' : 'SECRET';
			console.log(value);
			setFormData({ ...formData, [name]: value });
		} else {
			setFormData({ ...formData, [name]: target.value.trim() });
		}
	};

	const mutation = useMutation(
		(formdata) => {
			return axiosInstance.post('/articles/', formdata);
		},
		{
			onSuccess: async () => {
				console.log('im first!');
				queryClient.invalidateQueries('articles');
			},
			onError: async (err) => {
				console.log(err);
			},
		},
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.url_address === '') return;

		mutation.mutate(formData);
	};

	const handleRemoveAlert = () => {
		setIsClicked(!isClicked);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`${className} flex items-center  justify-center  border-1 border-green-400 rounded-xl relative`}
		>
			{mutation.isLoading ? (
				<div className="p-1 text-green-900 border-2 border-yellow-300 w-full font-logo flex items-center justify-center md:text-2xl relative rounded-xl">
					<Loading text="Adding this Article" />
				</div>
			) : (
				<>
					{mutation.isError ? (
						<Alert
							isClicked={isClicked}
							onClick={handleRemoveAlert}
							color="red"
							strong="Holy smokes! "
							message=" Something wrong happened"
						/>
					) : null}
					{mutation.isSuccess ? (
						<Alert
							isClicked={isClicked}
							onClick={handleRemoveAlert}
							color="green"
							strong="Hooray!"
							message="Successfully saved!!"
						/>
					) : null}

					<div className=" md:w-full mr-1 px-2">
						<input
							type="text"
							placeholder="   What is your today's interest?"
							name="url_address"
							className="form-input rounded-lg  placeholder-green-900 focus:placeholder-green-400
							md:w-full min-w-96 p-2 mt-0 block px-0.5 border-transparent bg-green-100 focus:ring-0 focus:bg-white focus:border-0"
							onChange={handleChange}
						/>
					</div>

					<div>
						<>
							<button
								type="submit"
								className="font-logo bg-green-600 hover:bg-green-700 text-white p-2 px-3 rounded-xl subpixel-antialiased text-xl"
							>
								marky
							</button>
						</>
					</div>
				</>
			)}
		</form>
	);
};

export default ScrapForm;

ScrapForm.propTypes = {
	className: PropTypes.string,
};
