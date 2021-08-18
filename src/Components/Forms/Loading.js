import PropTypes from 'prop-types';
import React from 'react';

const Ping = () => {
	return (
		<span className="flex h-3 w-3 relative mr-3">
			<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
			<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
		</span>
	);
};

const Loading = ({ text }) => {
	return (
		<div>
			<div className="p-2 text-green-600  font-logo flex items-center md:text-2xl relative">
				<Ping />
				<Ping />
				<Ping />
				<span className="mr-2">{text}</span>
				<Ping />
				<Ping />
				<Ping />
			</div>
		</div>
	);
};

export default Loading;

Loading.propTypes = {
	text: PropTypes.string,
};
