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

	const querystring = category !== undefined ? `&category=${category}` : '';

	const { data, isLoading } = useQuery(['articles', category], async () => {
		const { data: response } = await axiosInstance.get(
			`/articles/?username=${username}${querystring}`,
		);
		return response;
	});

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
