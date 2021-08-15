import React from 'react';
import { Link } from 'react-router-dom';
import { useMain } from '../../MainProvider';
import AfterAuth from './AfterAuth';
import BeforeAuth from './BeforeAuth';

const Navbar = () => {
	const { mainState } = useMain();
	const { isAuthenticated } = mainState;

	return (
		<div className="items-center grid grid-cols-12 p-5 border-b ">
			<Link to="/">
				<div className="font-logo text-4xl ml-6">Marky</div>
			</Link>
			{!isAuthenticated && <BeforeAuth />}
			{isAuthenticated && <AfterAuth />}
		</div>
	);
};

export default Navbar;
