import PropTypes from 'prop-types';
import React from 'react';

const ArchiveButton = ({ className, onClick, onMouseLeave }) => {
	return (
		<button
			type="button"
			className={className}
			onClick={() => onClick()}
			onMouseLeave={() => onMouseLeave()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-blue-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</button>
	);
};

export default ArchiveButton;

ArchiveButton.propTypes = {
	onClick: PropTypes.func,

	onMouseLeave: PropTypes.func,
	className: PropTypes.string,
};
