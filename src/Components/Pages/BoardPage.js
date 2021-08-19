import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import { useMain } from '../../MainProvider';
import ArticleBoard from '../Board/ArticleBoard';
import CategoryBoard from '../Board/CategoryBoard';

const Board = () => {
	const { mainState } = useMain();
	const { username } = mainState;
	const [searchInput, setSearchInput] = useState('');
	const location = useLocation();
	const { pathname, search } = location;

	const queryClient = useQueryClient();

	const handleSubmit = (e) => {
		e.preventDefault();
		queryClient.invalidateQueries('articles');
	};

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const linkQuery = search === '' ? `?q=${searchInput}` : `&q=${searchInput}`;

	return (
		<>
			<div className="m-2 w-full ">
				<form className="flex justify-center items-center md:w-full" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder={`Dear ${username}💚,  Search your Marky~!`}
						className="form-input bg-transparent hover:bg-green-500 text-green-700 font-light hover:text-white p-1 md:py-2 md:px-4 border border-green-500 hover:border-transparent rounded mr-2 w-7/12 text-sm md:text-base"
						name="search"
						onChange={handleChange}
					/>
					<Link to={`${pathname}${search}${linkQuery}`}>
						<button
							type="submit"
							className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white p-1 md:py-2 md:px-4 border border-green-500 hover:border-transparent rounded text-sm md:text-md"
						>
							Search
						</button>
					</Link>
				</form>
			</div>
			<div className="flex  md:min-h-screen flex-col lg:flex-row-reverse lg:justify-between">
				<CategoryBoard className="w-full rounded-md  mb-2 md:mb-2 lg:ml-2 lg:w-3/12 bg-pink-100  md:p-3" />
				<ArticleBoard className="w-full rounded-md  lg:w-9/12  md:h-full py-1 bg-green-100 md:p-3" />
			</div>
		</>
	);
};

export default Board;
