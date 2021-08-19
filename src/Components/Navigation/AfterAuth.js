import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { actions, useMain } from '../../MainProvider';
import axiosInstance from '../../utils/axios';
import ScrapForm from '../Forms/ScrapForm';

const AfterAuth = ({ className }) => {
	const { mainDispatch, mainState } = useMain();
	const history = useHistory();
	const { username } = mainState;
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		history.push('/');
		const refreshToken = localStorage.getItem('refresh_token');
		axiosInstance
			.post('/user/logout/', { refresh_token: refreshToken })
			.then(() => {
				mainDispatch({ type: actions.SIGNOUT });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const linkColorClassName = (buttonName) => {
		const { pathname } = location;

		if (pathname.slice(1).startsWith(buttonName)) {
			return 'text-pink-600 md:font-extrabold';
		}
	};

	return (
		<div className={`${className} flex justify-between items-center `}>
			<ScrapForm className=" w-10/12   md:mr-4 md:w-8/12" />

			<div className="flex items-center  md:mr-4 sm:mr-2">
				<Link to={`/board/${username}`}>
					<button
						className={`hidden  md:block font-medium  text-gray-600 ${linkColorClassName(
							'board',
						)}  lg:mr-10`}
						type="button"
					>
						Board
					</button>
				</Link>
				<div className="relative md:ml-10 ">
					<button
						type="button"
						className="block  h-8 w-8 rounded-full flex items-center justify-center text-blue-800 overflow-hidden  focus:outline-none focus:border-white"
						onClick={() => setIsOpen(!isOpen)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
							/>
						</svg>
					</button>
					<div
						className={`absolute right-0 z-40 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl ${
							!isOpen ? 'invisible' : ''
						}`}
						onMouseLeave={() => setIsOpen(false)}
					>
						<Link to={`/my-page/${username}`}>
							<button
								type="button"
								className={`block w-full px-4 py-2 text-gray-800 hover:bg-pink-500 hover:text-white ${linkColorClassName(
									'my-page',
								)}`}
							>
								Account settings
							</button>
						</Link>
						<Link to={`/board/${username}`}>
							<button
								className={`block w-full px-4 py-2 text-gray-800 hover:bg-pink-500 hover:text-whit ${linkColorClassName(
									'board',
								)}  md:mr-10`}
								type="button"
							>
								Board
							</button>
						</Link>
						<Link to="/">
							<button
								type="button"
								className="block w-full px-4 py-2 text-gray-800 hover:bg-pink-500 hover:text-white"
								onClick={handleLogout}
							>
								Sign out
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AfterAuth;

AfterAuth.propTypes = {
	className: PropTypes.string,
};
