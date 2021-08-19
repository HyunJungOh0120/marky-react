import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import Article from '../Articles/Article';
import Loading from '../Forms/Loading';

const ArticleBoard = ({ className }) => {
	const { username } = useParams();
	const { search } = useLocation();
	const { category } = queryString.parse(search);
	const { q } = queryString.parse(search);

	console.log('q: ', q);

	const categoryQuerystring = category !== undefined ? `&category=${category}` : '';
	const searchQuerystring = q !== undefined ? `&search=${q}` : '';

	const { data, isLoading } = useQuery(['articles', category, q], async () => {
		const { data: response } = await axiosInstance.get(
			`/articles/?username=${username}${categoryQuerystring}${searchQuerystring}`,
		);
		return response;
	});

	console.log(data && data);
	return (
		<div className={className}>
			{isLoading && <Loading text="Loading..." />}
			{data && data.length === 0 && <div>no article yet</div>}
			{data &&
				data.length > 0 &&
				data.map((article) => <Article key={article.id} article={article} />)}
		</div>
	);
};

export default ArticleBoard;

ArticleBoard.propTypes = {
	className: PropTypes.string,
};
