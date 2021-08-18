import React from 'react';
import { Link } from 'react-router-dom';
import { useMain } from '../../MainProvider';
import AfterAuth from './AfterAuth';
import BeforeAuth from './BeforeAuth';

const Navbar = () => {
	const { mainState } = useMain();
	const { isAuthenticated } = mainState;

	return (
		<div className=" flex flex-wrap justify-between items-center  p-5 border-b px-8 z-50">
			<Link to="/">
				<div className=" font-logo text-4xl ml-3 flex-none">
					<span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-blue-600">
						{' '}
						Marky
					</span>
				</div>
			</Link>
			{!isAuthenticated && <BeforeAuth className="md:w-2/12" />}
			{isAuthenticated && <AfterAuth className="md:w-9/12 z-50" />}
		</div>
	);
};

export default Navbar;
