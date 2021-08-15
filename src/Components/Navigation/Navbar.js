import React from 'react';
import { Link } from 'react-router-dom';
import BeforeAuth from './BeforeAuth';
import AfterAuth from './AfterAuth';
import { useMain } from '../../MainProvider';

const Navbar = () => {
	const { mainState } = useMain();
	const { isAuthenticated } = mainState;

	return (
		<div className="items-center grid grid-cols-12 p-5 border-b ">
			<Link to="/">
				<div className="font-logo text-4xl ml-3">Marky</div>
			</Link>
			{!isAuthenticated && <BeforeAuth />}
			{isAuthenticated && <AfterAuth />}
		</div>
	);
};

export default Navbar;
