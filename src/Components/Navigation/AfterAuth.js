import React from 'react';
import { Link } from 'react-router-dom';

const AfterAuth = () => {
	return (
		<>
			<div className="col-start-3 col-end-5">
				<div className="grid grid-cols-2">
					<Link to="/story">
						<div>Story</div>
					</Link>

					<Link to="/forum">
						<div>Forum</div>
					</Link>
				</div>
			</div>
			<form>
				<input type="text" placeholder="Put the URL" />
				<button type="submit" className="font-logo">
					marky
				</button>
			</form>
			<div className="col-start-11 col-end-13">
				<div className="grid grid-cols-2">
					<Link to="/login">
						<div>My page</div>
					</Link>

					<Link to="/logout">
						<div>Log out</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default AfterAuth;
