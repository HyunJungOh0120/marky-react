import React from 'react';
import { Link } from 'react-router-dom';

const LadingPage = () => {
	return (
		<main className="relative  mx-auto max-w-7xl px-4  sm:px-6  lg:px-8 pb-20">
			<div className="flex items-center justify-between py-10 lg:py-20 max-w-7-xl mx-auto">
				<div className="sm:text-center lg:text-left">
					<h1 className="text-4xl leading-relaxed tracking-wider tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
						<span className="block xl:inline"> Keep your Lists,</span> <br />
						<span className="block text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-blue-600 xl:inline">
							{' '}
							Leave your Ideas
						</span>
					</h1>

					<p className="mt-3 text-base text-left text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 overflow-ellipsis mb-4">
						Did you always look for notes to write down some ideas when reading something
						interesting? Or did you just let them go?
						<br />
						Join us! Marky is here for you!
					</p>
					<Link to="/register/">
						<div className="w-56 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-7">
							I&apos;d like to Join!
						</div>
					</Link>
				</div>
				<div className="lg:w-6/12 shadow-lg">
					<img
						src="https://github.com/HyunJungOh0120/marky-react/blob/main/public/img/category.gif?raw=true"
						alt="adding"
						className="w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-full"
					/>
				</div>
			</div>
			<div className="flex items-center justify-between py-10 lg:py-20 max-w-7-xl mx-auto ">
				<div className="lg:w-6/12 shadow-lg">
					<img
						src="https://github.com/HyunJungOh0120/marky-react/blob/main/public/img/adding.gif?raw=true"
						alt="category"
						className="w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-full"
					/>
				</div>
				<div className="w-6/12 flex flex-col justify-center items-center">
					<h3 className="text-2xl leading-relaxed  tracking-wider tracking-tight font-bold text-gray-900 sm:text-3xl md:text-4xl mb-4">
						Keep it easy to book mark
					</h3>
					<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
						Simply put your desired articles&apos; URL{' '}
					</p>
				</div>
			</div>
			<div className="flex items-center justify-between py-10 lg:py-20 max-w-7-xl mx-auto">
				<div className="w-6/12 flex flex-col justify-center items-center">
					<h3 className="text-2xl leading-relaxed tracking-wider tracking-tight font-bold text-gray-900 sm:text-3xl md:text-4xl mb-4">
						Many drops make a shower.
					</h3>
					<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
						Leave any memo. Just write! All will be your precious asset
					</p>
				</div>
				<div className="lg:w-6/12 shadow-lg">
					<img
						src="https://github.com/HyunJungOh0120/marky-react/blob/main/public/img/memo.gif?raw=true"
						alt="category"
						className="w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-full"
					/>
				</div>
			</div>
			<div className="bg-gray-50">
				<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
					<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						<span className="block">Ready to dive in?</span>
						<span className="block text-indigo-600">Start your &quot;Marky&quot; today.</span>
					</h2>
					<div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
						<div className="inline-flex rounded-md shadow">
							<Link to="/register/">
								<button
									type="button"
									className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
								>
									Get started
								</button>
							</Link>
						</div>
						{/* <div className="ml-3 inline-flex rounded-md shadow">
							<a
								href="#d"
								className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
							>
								Learn more
							</a>
						</div> */}
					</div>
				</div>
			</div>
		</main>
	);
};

export default LadingPage;
