import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axiosInstance from '../../utils/axios';
import Article from '../Articles/Article';
import Loading from '../Forms/Loading';

const ArticleBoard = ({ className }) => {
	const { username } = useParams();
	// const [articles, setArticles] = useState([]);

	const { data, isLoading } = useQuery('articles', async () => {
		const { data: response } = await axiosInstance.get(`/articles/?username=${username}`);
		return response;
	});

	// if (isLoading) return 'Loading...';

	// if (error) return `An error has occurred: ${error.message}`;
	console.log(data && data);

	return (
		<div className={className}>
			{isLoading && <Loading text="Loading..." />}
			{data && data.map((article) => <Article key={article.id} article={article} />)}
		</div>
	);
};

export default ArticleBoard;

ArticleBoard.propTypes = {
	className: PropTypes.string,
};
