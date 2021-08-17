import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';

const ScrapForm = () => {
	const initialForm = Object.freeze({
		url_address: '',
		status: 'Secret',
	});

	const [formData, setFormData] = useState(initialForm);

	const handleChange = (e) => {
		const { target } = e;
		const { name } = target;

		if (target.type === 'checkbox') {
			const value = target.checked ? 'Public' : 'Secret';
			console.log(value);
			setFormData({ ...formData, [name]: value });
		} else {
			setFormData({ ...formData, [name]: target.value.trim() });
		}
	};
	console.log(formData);

	const handleSubmit = (e) => {
		e.preventDefault();

		//TODO
		axiosInstance
			.post('/articles/', formData)
			.then((res) => {
				// eslint-disable-next-line
				console.log(res);
				// if (res.status === 201) {
				// 	const articleData = {
				// 		url_address: res.data.url_address,
				// 		title: res.data.title,
				// 		article: res.data.id,
				// 	};
				// 	// //! TODO CHECK
				// 	// axiosInstance
				// 	// 	.post('/articles/upload/', articleData)
				// 	// 	.then((uRes) => {
				// 	// 		console.log(uRes);
				// 	// 		setData(res.data);
				// 	// 	})
				// 	// 	.catch((err) => {
				// 	// 		console.log(err);
				// 	// 	});
				// }
				// console.log(res.data);
				//url title article_id
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center justify-between col-start-5 col-end-10 border-1 border-green-400 rounded-xl "
		>
			<div className="w-2/3">
				<input
					type="text"
					placeholder="Put the URL"
					name="url_address"
					className="form-input rounded-lg w-full p-2 mt-0 block px-0.5 border-transparent bg-green-100 focus:ring-0 focus:bg-white focus:border-3"
					onChange={handleChange}
				/>
			</div>
			<div className="inline-flex items-center">
				<input
					type="checkbox"
					name="status"
					id="status"
					className="rounded text-pink-500 form-checkbox "
					onChange={handleChange}
				/>
				<span className="ml-2">Public</span>
			</div>
			<button
				type="submit"
				className="font-logo bg-green-600 hover:bg-green-700 text-white p-2 px-3 rounded-xl subpixel-antialiased text-xl"
			>
				marky
			</button>
		</form>
	);
};

export default ScrapForm;
