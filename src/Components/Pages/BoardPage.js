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
				<form className="flex justify-center" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder={`Dear ${username}💚,  Search your Marky~!`}
						className="form-input bg-transparent hover:bg-green-500 text-green-700 font-light hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-2 w-7/12"
						name="search"
						onChange={handleChange}
					/>
					<Link to={`${pathname}${search}${linkQuery}`}>
						<button
							type="submit"
							className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
						>
							Search
						</button>
					</Link>
				</form>
			</div>
			<div className="container mx-auto bg-green-100 flex  min-h-screen md:flex-row-reverse">
				<CategoryBoard className="w-2/12 bg-pink-100 p-3" />
				<ArticleBoard className="w-10/12  h-full p-3" />
			</div>
		</>
	);
};

export default Board;
