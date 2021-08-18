const axios = require('axios');

const axiosInstance = axios.create({
	baseURL: `/api`,
	headers: {
		'Content-Type': 'application/json',

		// Authorization: localStorage.getItem('access_token')
		// 	? `Bearer ${localStorage.getItem('access_token')}`
		// 	: null,
		// accept: 'application/json',
	},
});

// const getCookie = (name) => {
// 	let cookieValue = null;
// 	if (document.cookie && document.cookie !== '') {
// 		const cookies = document.cookie.split(';');
// 		for (let i = 0; i < cookies.length; i += 1) {
// 			const cookie = cookies[i].trim();
// 			// Does this cookie string begin with the name we want?
// 			if (cookie.substring(0, name.length + 1) === `${name}=`) {
// 				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
// 				break;
// 			}
// 		}
// 	}
// 	return cookieValue;
// };

// const csrftoken = getCookie('csrftoken');

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axiosInstance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		const accessToken = localStorage.getItem('access_token');
		// eslint-disable-next-line
		// config.headers['X-CSRFToken'] = csrftoken;
		config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
		console.log(config);

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
		console.log('originalRequest: ', originalRequest);
		if (typeof error.response === 'undefined') {
			// eslint-disable-next-line
			alert('A server/network error occured.');
			return Promise.reject(error);
		}
		if (error.response.status === 401 && originalRequest.url === `/user/login/refresh/`) {
			console.log('this error');
			window.location.href = '/login/';
			return Promise.reject(error);
		}
		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			//eslint-disable-next-line
			console.log('token not valid?🍉');
			const refreshToken = localStorage.getItem('refresh_token');
			if (refreshToken !== 'undefined') {
				const exp = refreshToken.split('.')[1];

				const tokenParts = JSON.parse(atob(exp));
				const now = Math.ceil(Date.now() / 1000);
				console.log('tokenParts.exp : now ', tokenParts.exp, now);
				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/user/login/refresh/', { refresh: refreshToken })
						.then((res) => {
							//eslint-disable-next-line

							console.log(res);

							localStorage.setItem('access_token', res.data.access);
							localStorage.setItem('refresh_token', res.data.refresh);

							// eslint-disable-next-line
							axiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.access}`;
							// eslint-disable-next-line
							originalRequest.defaults.headers['Authorization'] = `Bearer ${res.data.access}`;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							//eslint-disable-next-line
							console.log(err);

							window.location.href = '/login/';
						});
				}
			} else {
				window.location.href = '/login/';
			}
			//eslint-disable-next-line
			console.log(error.message);
			// window.location.href = '/login/';
		}
		return Promise.reject(error);
	},
);

// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async function (error) {
// 		const originalRequest = error.config;
// 		console.log(originalRequest);
// 		if (error.response.status === 403 && !originalRequest._retry) {
// 			originalRequest._retry = true;
// 			const accessToken = await refreshAccessToken();
// 			// eslint-disable-next-line
// 			axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
// 			return axiosInstance(originalRequest);
// 		}
// 		return Promise.reject(error);
// 	},
// );

// const refreshAccessToken = () => {
// 	let refresh = '';
// 	axiosInstance.post('/user/login/refresh/').then((res) => {
// 		refresh = res.data.access;
// 	});
// 	return refresh;
// };

export default axiosInstance;
