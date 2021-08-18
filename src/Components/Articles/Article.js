import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import DeleteButton from './DeleteButton';

//eslint-disable-next-line
const Article = ({ article }) => {
	const queryClient = useQueryClient();
	// eslint-disable-next-line
	const { id, title, image, description, category, created_at: createdAt, slug, user } = article;
	const date = new Date(createdAt);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
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

	const handleDelete = (e) => {
		e.preventDefault();
		// axiosInstance.delete(`/articles/${id}`).then((res) => console.log(res));
		mutation.mutate();
	};

	return (
		<div className="w-full bg-white p-3 px-4 rounded-xl overflow-hidden shadow-xl mb-5 relative flex">
			<DeleteButton onClick={handleDelete} />
			<div className="flex-none w-60 mr-3 shadow rounded relative h-36">
				{image === 'No image' && (
					<div className="flex justify-center items-center h-full ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-9 w-9 text-gray-600 "
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
