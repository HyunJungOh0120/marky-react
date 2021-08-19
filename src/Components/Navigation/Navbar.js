import React from 'react';
import { Link } from 'react-router-dom';
import { useMain } from '../../MainProvider';
import AfterAuth from './AfterAuth';
import BeforeAuth from './BeforeAuth';

const Navbar = () => {
	const { mainState } = useMain();
	const { isAuthenticated } = mainState;

	return (
		<div className=" flex flex-wrap my-2 pb-2  justify-between items-center  lg:p-5 border-b lg:px-8 ">
			<Link to="/">
				<div className=" font-logo md:text-4xl ml-3 mr-3 flex-none">
					<span className="text-3xl  md:text-5xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-blue-600">
						{' '}
						Marky
					</span>
				</div>
			</Link>
			{!isAuthenticated && <BeforeAuth className="mr-3  w-3/12 md:w-3/12 xl:w-2/12" />}
			{isAuthenticated && <AfterAuth className="w-9/12 md:w-9/12 " />}
		</div>
	);
};

export default Navbar;
