import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import ArchiveButton from './ArchiveButton';
import DeleteButton from './DeleteButton';

const Selection = ({ data, className, onChange, onMouseEnter, onMouseLeave }) => {
	return (
		<div
			className={className}
			onMouseEnter={() => {
				onMouseEnter();
			}}
			onMouseLeave={() => {
				onMouseLeave();
			}}
		>
			<select
				className="form-select"
				onChange={(e) => {
					onChange(e);
				}}
			>
				<option>Select Category</option>
				{data.map((cat) => (
					<option key={cat.name} value={cat.name}>
						{cat.name}
					</option>
				))}
			</select>
		</div>
	);
};

Selection.propTypes = {
	// eslint-disable-next-line
	data: PropTypes.array,
	className: PropTypes.string,
	onChange: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
};

//eslint-disable-next-line
const Article = ({ article }) => {
	const queryClient = useQueryClient();
	const {
		id,
		// eslint-disable-next-line
		url_address,
		title,
		image,
		description,
		category,
		created_at: createdAt,
		slug,
		user,
	} = article;
	const date = new Date(createdAt);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const [isOpen, setIsOpen] = useState(false);
	// userid of article

	const mutation = useMutation(
		() => {
			return axiosInstance.delete(`/articles/${id}`);
		},
		{
			onSuccess: async () => {
				console.log('im first!');
				queryClient.invalidateQueries('articles');
			},
		},
	);

	const categoryMutation = useMutation(
		(data) => {
			return axiosInstance.put(`/articles/${id}`, data);
		},
		{
			onSuccess: async () => {
				console.log('success!💚');
				queryClient.invalidateQueries('articles');
			},
			onError: async (err) => {
				console.log('💥', err.messsage);
			},
		},
	);

	const handleDelete = (e) => {
		e.preventDefault();
		// axiosInstance.delete(`/articles/${id}`).then((res) => console.log(res));
		mutation.mutate();
	};

	const { data: categoryData } = useQuery('category', async () => {
		const { data: response } = await axiosInstance.get(`/category/`);
		return response;
	});

	const handleClickCategory = () => {
		setIsOpen(!isOpen);
	};

	//* change category for article
	const handleSelect = (e) => {
		const name = e.target.value;
		const selectedIndex = categoryData.findIndex((cat) => cat.name === name);
		const sel = categoryData[selectedIndex];
		const { id: newCategoryId } = sel;
		const data = {
			...article,
			category: newCategoryId,
		};
		categoryMutation.mutate(data);
	};

	return (
		<div className="w-full bg-white p-3  md:px-4 md:pr-7 rounded-xl overflow-hidden shadow-xl mb-5 relative flex">
			<Selection
				data={categoryData}
				className={`absolute right-2 top-2 z-50 ${!isOpen ? 'invisible' : ''}`}
				onChange={handleSelect}
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
				category={category}
			/>

			<div className="absolute right-2 top-2 flex items-center z-40 bg-white">
				<ArchiveButton
					onClick={handleClickCategory}
					onMouseLeave={() => {
						setIsOpen(false);
					}}
				/>
				<DeleteButton onClick={handleDelete} className="ml-2 cursor-pointer" />
			</div>
			<div className="flex-none md:w-60 mr-3 shadow rounded relative h-36 sm:hidden md:block">
				{image === 'No image' && (
					<div className="flex justify-center items-center w-full h-full bg-green-300 rounded-xl ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-9 w-9 text-white "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				)}
				{image !== 'No image' && (
					<img
						src={image}
						alt={`This article's ${image}  `}
						className="rounded-xl object-cover w-full h-full"
					/>
				)}
			</div>
			<div className="flex-col  md:w-9/12 relative">
				<Link to={`/article/${id}?scrap_user=${user}?title=${slug}`}>
					<h3 className="title mb-3 text-xl truncate font-semibold antialiased leading-relaxed hover:underline cursor-pointer">
						{title}
					</h3>
				</Link>

				<div className="mb-3 text-lg break-words overflow-ellipsis flex">
					<p className="description mt-1 text-sm antialiased leading-relaxed text-left">
						{description}
					</p>
				</div>
				<div className="absolute bottom-3 right-3 font-mono font-light flex justify-end ">
					<span className=" mr-4 inline-block">{category && category}</span>
					<span className="inline-block text-gray-600 text-sm">
						{year}-{month}-{day}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Article;

Article.propTypes = {
	article: PropTypes.shape({
		id: PropTypes.number,
		url_address: PropTypes.string,
		title: PropTypes.string,
		image: PropTypes.string,
		description: PropTypes.string,
		category: PropTypes.number,
		created_at: PropTypes.string,
		slug: PropTypes.string,
		user: PropTypes.number,
	}),
};
