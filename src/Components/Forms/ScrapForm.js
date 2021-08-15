import React from 'react';

const ScrapForm = () => {
	const handleSubmit = (e) => {
		e.preventDefault();

		//TODO
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center justify-between col-start-5 col-end-10 border-1 border-green-400 rounded-xl "
		>
			<div className="w-2/3">
				<input
					type="text"
					placeholder="Put the URL"
					name="url_address"
					className="form-input rounded-lg w-full p-2 mt-0 block px-0.5 border-transparent bg-green-100 focus:ring-0 focus:bg-white focus:border-3"
				/>
			</div>
			<div className="inline-flex items-center">
				<input
					type="checkbox"
					name="status"
					id="status"
					className="rounded text-pink-500 form-checkbox "
				/>
				<span className="ml-2">Public</span>
			</div>
			<button
				type="submit"
				className="font-logo bg-green-600 hover:bg-green-700 text-white p-2 px-3 rounded-xl subpixel-antialiased text-xl"
			>
				marky
			</button>
		</form>
	);
};

export default ScrapForm;
