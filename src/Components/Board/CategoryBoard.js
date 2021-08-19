import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import { useMain } from '../../MainProvider';
import axiosInstance from '../../utils/axios';

const ColoredIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-4 w-4 mr-1 text-red-400"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
		</svg>
	);
};

const LineIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-4 w-4 mr-1 text-red-300"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
			/>
		</svg>
	);
};

const CategoryBoard = ({ className }) => {
	const { mainState } = useMain();
	const { username } = mainState;
	const queryClient = useQueryClient();
	const initialForm = Object.freeze({
		topic: '',
		name: '',
	});
	const [formData, setFormData] = useState(initialForm);
	const { search } = useLocation();
	const { category: categoryQueryString } = queryString.parse(search);

	const BookMarkIconColor = (slug) => {
		if (categoryQueryString === slug) {
			return <ColoredIcon />;
		}
		return <LineIcon />;
	};

	const BookMarkIconColorForAll = () => {
		if (categoryQueryString === undefined) {
			return <ColoredIcon />;
		}
		return <LineIcon />;
	};

	const { data, isLoading } = useQuery('category', async () => {
		const { data: response } = await axiosInstance.get(`/category/`);
		return response;
	});

	const { data: choices } = useQuery('choice', async () => {
		const { data: response } = await axiosInstance.get('/category/choice/');
		return response;
	});

	const handleClick = () => {
		queryClient.invalidateQueries('articles');
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const submitMutation = useMutation(
		(formdata) => {
			return axiosInstance.post(`/category/`, formdata);
		},
		{
			onSuccess: async () => {
				queryClient.invalidateQueries('category');
			},
		},
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.topic === '' || formData.name === '') return;

		submitMutation.mutate(formData);
	};

	return (
		<div className={className}>
			<form
				className="relative md:w-full flex md:flex-col md:items-center md:justify-center md:mb-6 "
				onSubmit={handleSubmit}
			>
				<select
					name="topic"
					className="form-select block appearance-none w-full bg-white border border-pink-400 hover:border-pink-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-2 text-pink-400"
					onChange={handleChange}
				>
					<option className="text-gray-300">Please select topic</option>
					{choices &&
						choices.map((choice) => (
							<optgroup key={choice[0]} label={choice[0]}>
								{choice[1].map((opt) => (
									<option key={opt[0]} value={opt[0]}>
										{opt[0]}
									</option>
								))}
							</optgroup>
						))}
				</select>

				<input
					type="text"
					className="form-input rounded md:w-full mb-2 placeholder-pink-500 placeholder-opacity-50 appearance-none bg-transparent border-0 border-b-2  leading-tight focus:outline-none"
					placeholder="Write Category name"
					name="name"
					onChange={handleChange}
				/>
				<button
					type="submit"
					className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded-md md:w-full"
				>
					CREATE
				</button>
			</form>
			<ul className="md:list-inside text-gray-700">
				{isLoading && <div>Loading...</div>}
				{!isLoading && (
					<>
						<Link to={`/board/${username}`}>
							<li>
								<button
									type="button"
									onClick={handleClick}
									className="bg-white mb-2 p-2 flex items-center md:w-full rounded-md"
								>
									{BookMarkIconColorForAll()}
									All
								</button>
							</li>
						</Link>
						{data &&
							data.map((category) => (
								<Link key={category.id} to={`/board/${username}?category=${category.slug}`}>
									<li>
										<button
											type="button"
											onClick={handleClick}
											className="bg-white mb-2 p-2 flex items-center cursor-pointer md:w-full rounded-md"
										>
											{BookMarkIconColor(category.slug)}
											{category.name}
										</button>
									</li>
								</Link>
							))}
					</>
				)}
			</ul>
		</div>
	);
};

export default CategoryBoard;

CategoryBoard.propTypes = {
	className: PropTypes.string,
};

// id topic name slug user

// <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-300" viewBox="0 0 20 20" fill="currentColor">
//   <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
// </svg>
