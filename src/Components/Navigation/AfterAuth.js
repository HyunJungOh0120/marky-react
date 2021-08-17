import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { actions, useMain } from '../../MainProvider';
import axiosInstance from '../../utils/axios';
import ScrapForm from '../Forms/ScrapForm';

const AfterAuth = () => {
	const { mainDispatch } = useMain();
	const history = useHistory();

	const handleLogout = () => {
		history.push('/');
		axiosInstance
			.post('/user/logout/')
			.then(() => {
				mainDispatch({ type: actions.SIGNOUT });
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
			<ScrapForm />
			<div className="col-start-11 col-end-13">
				<div className="grid grid-cols-2">
					<Link to="/login">
						<div>My page</div>
					</Link>

					<Link to="/">
						<button type="button" onClick={handleLogout}>
							Log out
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default AfterAuth;
