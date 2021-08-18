import React from 'react';
import PropTypes from 'prop-types';

const CategoryBoard = ({ className }) => {
	return <div className={className}>category</div>;
};

export default CategoryBoard;

CategoryBoard.propTypes = {
	className: PropTypes.string,
};
