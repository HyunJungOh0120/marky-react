import React from 'react';
import { Link } from 'react-router-dom';

const BeforeAuth = () => {
	return (
		<div className="col-start-11 col-end-13">
			<div className="grid grid-cols-2">
				<Link to="/login">
					<div>Log In</div>
				</Link>

				<Link to="/register">
					<div>Register</div>
				</Link>
			</div>
		</div>
	);
};

export default BeforeAuth;
