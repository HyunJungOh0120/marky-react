import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import ScrapForm from '../Forms/ScrapForm';
import { useMain, actions } from '../../MainProvider';

const AfterAuth = () => {
	const { mainDispatch } = useMain();
	const history = useHistory();

	const handleLogout = () => {
		axiosInstance.post('/user/logout/').then((res) => {
			//eslint-disable-next-line
			console.log(res);
			mainDispatch({ type: actions.SIGNOUT });

			history.push('/');
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

					<Link to="/logout">
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
