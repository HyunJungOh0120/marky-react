import React from 'react';
import { Link } from 'react-router-dom';
import BeforeAuth from './BeforeAuth';

const Navbar = () => (
	<div className="items-center grid grid-cols-12 p-5 border-b ">
		<Link to="/">
			<div className="font-logo text-4xl ml-3">Marky</div>
		</Link>
		<BeforeAuth />
	</div>
);

export default Navbar;
