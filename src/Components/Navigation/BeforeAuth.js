import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const BeforeAuth = ({ className }) => {
	return (
		<div className={`${className}`}>
			<div className="bg-gray-100 flex justify-between items-center">
				<Link to="/login">
					<div className="">Log In</div>
				</Link>

				<Link to="/register">
					<div className="md:mx-10">Register</div>
				</Link>
			</div>
		</div>
	);
};

export default BeforeAuth;

BeforeAuth.propTypes = {
	className: PropTypes.string,
};
