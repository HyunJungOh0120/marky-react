import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '../../utils/axios';
import MemoBoard from './MemoBoard';

const ArticleDetail = () => {
	const [article, setArticle] = useState({});
	const [isShown, setIsShown] = useState(false);

	const { articleId } = useParams();

	useEffect(() => {
		axiosInstance.get(`/articles/${articleId}`).then((res) => {
			console.log(res);
			setArticle(res.data);
		});
	}, []);

	const buttonClick = () => {
		setIsShown(!isShown);
	};

	console.log(article && article);
	return (
		<div className="lg:container mx-auto ">
			<div className="mx-auto text-center">
				<a className="underline text-center text-gray-400 mb-2" href={article.url_address}>
					View Original
				</a>
			</div>
			<div className="lg:flex lg:justify-beetween">
				<MemoBoard
					className={`fixed  lg:hidden transition duration-150 h-screen top-0 ${
						isShown ? 'transform translate-x-0' : 'transform -translate-x-full'
					}    flex flex-col  m-2 mt-0 w-96 p-2 items-center bg-green-100 `}
				/>
				<MemoBoard className="hidden  lg:block  h-screen   flex flex-col  m-2 mt-0 w-96 p-2 lg:items-center bg-green-100" />
				<button className="fixed top-2/4 " onClick={buttonClick} type="button">
					{!isShown && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 lg:hidden text-green-900"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 5l7 7-7 7M5 5l7 7-7 7"
							/>
						</svg>
					)}
					{isShown && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 lg:hidden text-green-900"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
							/>
						</svg>
					)}
				</button>

				<div className="h-screen overflow-scroll">
					<img src={article && article.file_url} alt={article && article.title} />
					<p>In deploy version, due to module error,</p>
					{/* <Image publicId="https://cnn.com" type="url2png" /> */}
				</div>
			</div>
		</div>
	);
};

export default ArticleDetail;
