import React from 'react';
import ArticleBoard from '../Board/ArticleBoard';
import CategoryBoard from '../Board/CategoryBoard';

const Board = () => {
	return (
		<div className="container mx-auto bg-green-100 flex  min-h-screen md:flex-row-reverse">
			<CategoryBoard className="w-2/12 bg-pink-100 p-3" />
			<ArticleBoard className="w-10/12  h-full p-3" />
		</div>
	);
};

export default Board;
