import React from 'react';
import Moment from 'react-moment';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useMain } from '../../MainProvider';
import axiosInstance from '../../utils/axios';

const MyPage = () => {
	const { mainState } = useMain();
	const { username } = mainState;
	// fields = ['id', ''username,'last_login', 'email', 'date_joined']
	const { data } = useQuery('user', async () => {
		const { data: response } = await axiosInstance.get(`/user/info/`);
		return response;
	});

	const Info = (obj, key) => {
		if (key === 'last_login' || key === 'date_joined') {
			return <Moment format="YYYY-MM-DD">{obj[key]}</Moment>;
		}
		return obj[key];
	};

	const keyClassName =
		'border-0 border-b-2 bg-white px-4 py-4 w-1/3 text-sm font-normal text-gray-500';

	return (
		<div className="container rounded">
			<div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 flex flex-col justify-center items-center rounded">
				<h1 className="text-3xl  md:text-5xl  font-extrabold text-white">Welcome, {username} </h1>
			</div>
			<div className="flex flex-col justify-center items-center px-4 py-4 border rounded">
				<h2 className="self-start text-gray-800 text-xl mb-3">Basic info</h2>
				<table className="  w-full lg:w-full lg:w-3/4 table-fixed overflow-hidden">
					<tbody>
						{data &&
							Object.keys(data).map((key) => (
								<tr key={key}>
									<td className={keyClassName}>{key.toUpperCase().replace('_', ' ')}</td>
									<td className="border-0 border-b-2 bg-white px-4 py-4 font-normal text-gray-800">
										{Info(data, key)}
									</td>
								</tr>
							))}
						<tr>
							<td className={keyClassName}>PASSWORD</td>
							<td className="border-0 border-b-2 bg-white px-4 py-4 flex justify-between items-center">
								********
								<Link to="/change-password">
									<button
										type="button"
										className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-2 border border-green-500 hover:border-transparent rounded text-xs"
									>
										Change Password
									</button>
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyPage;
/*
{
	 <form className="w-full max-w-sm">
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label
							className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
							htmlFor="username"
						>
							Email
						</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							id="username"
							type="text"
							defaultValue="Jane Doe"
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label
							className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
							htmlFor="username"
						>
							Username
						</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							id="username"
							type="text"
							defaultValue="Jane Doe"
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label
							className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
							htmlFor="inline-password"
						>
							Password
						</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							id="inline-password"
							type="password"
							placeholder="******************"
						/>
					</div>
				</div>

				<div className="md:flex md:items-center">
					<div className="md:w-1/3"> </div>
					<div className="md:w-2/3">
						<button
							className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							type="button"
						>
							Sign Up
						</button>
					</div>
				</div>
			</form> 
}*/
