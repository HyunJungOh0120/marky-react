import { PropTypes } from 'prop-types';
import { useMemo } from 'react';
import { useMain } from './MainProvider';
import axiosInstance from './utils/axios';

const getCookie = (name) => {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i += 1) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === `${name}=`) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
};

const { BASE_HOST } = process.env;

const WithAxios = ({ children }) => {
	const { mainState } = useMain();
	const { accessToken } = mainState;

	useMemo(() => {
		const csrftoken = getCookie('csrftoken');

		// Alter defaults after instance has been created
		// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
		axiosInstance.interceptors.request.use(
			function (config) {
				// Do something before request is sent
				// eslint-disable-next-line
				console.log('axios request interceptor!');
				axiosInstance.defaults.headers['X-CSRFToken'] = csrftoken;
				axiosInstance.defaults.headers.Authorization = accessToken ? `Bearer ${accessToken}` : null;
				return config;
			},
			function (error) {
				// Do something with request error
				return Promise.reject(error);
			},
		);

		// Add a response interceptor
		axiosInstance.interceptors.response.use(
			function (response) {
				// Any status code that lie within the range of 2xx cause this function to trigger
				// Do something with response data
				return response;
			},
			async function (error) {
				// eslint-disable-next-line
				console.log('error from interceptor', error);
				const originalRequest = error.config;
				if (typeof error.response === 'undefined') {
					// eslint-disable-next-line
					alert('A server/network error occured.');
					return Promise.reject(error);
				}
				if (
					error.response.status === 401 &&
					originalRequest.url === `${BASE_HOST}/api/user/login/refresh/`
				) {
					window.location.href = '/login/';
					return Promise.reject(error);
				}
				if (
					error.response.data.code === 'token_not_valid' &&
					error.response.status === 401 &&
					error.response.statusText === 'Unauthorized'
				) {
					return axiosInstance
						.post('/user/login/refresh', { access: accessToken })
						.then((res) => {
							//
							//eslint-disable-next-line
							console.log(res);
							//eslint-disable-next-line
							console.log(res.data.access);

							axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.access}`;
							originalRequest.defaults.headers.Authorization = `Bearer ${res.data.access}`;
						})
						.catch((err) => {
							//eslint-disable-next-line
							console.log(err);
							window.location.href = '/login/';
						});
				}
			},
		);
	}, [accessToken]);

	return children;
};

export default WithAxios;

WithAxios.propTypes = {
	children: PropTypes.node.isRequired,
};
