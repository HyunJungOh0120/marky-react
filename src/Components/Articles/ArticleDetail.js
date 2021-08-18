import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import MemoBoard from './MemoBoard';

const ArticleDetail = () => {
	const [article, setArticle] = useState({});

	const { articleId } = useParams();

	useEffect(() => {
		axiosInstance.get(`/articles/${articleId}`).then((res) => {
			console.log(res);
			setArticle(res.data);
		});
	}, []);

	console.log('article', article);

	return (
		<div className="container mx-auto bg-gray-200 py-2">
			<div>
				<a className="underline" href={article.url_address}>
					View Original
				</a>
			</div>
			<div className="md:flex md:justify-beetween">
				<MemoBoard className="flex flex-col m-2 w-96 p-2 items-center bg-green-100 " />

				<div className="">
					<img src={article && article.file_url} alt={article && article.title} />
				</div>
			</div>
		</div>
	);
};

export default ArticleDetail;
