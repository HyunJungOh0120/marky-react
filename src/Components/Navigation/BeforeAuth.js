import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const BeforeAuth = ({ className }) => {
	return (
		<div className={`${className}`}>
			<div className=" flex justify-between items-center">
				<Link to="/login">
					<div className="text-purple-800">Log In</div>
				</Link>

				<Link to="/register">
					<div className="text-indigo-800 md:mx-10">Register</div>
				</Link>
			</div>
		</div>
	);
};

export default BeforeAuth;

BeforeAuth.propTypes = {
	className: PropTypes.string,
};
