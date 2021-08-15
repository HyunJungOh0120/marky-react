const axios = require('axios');

// const BASE_HOST = process.env.BASE_HOST || 'http://localhost:8000';
// baseURL: `${BASE_HOST}/api`,
const axiosInstance = axios.create({
	baseURL: `/api`,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' },
	Authorization: '',
});

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
const csrftoken = getCookie('csrftoken');

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		// eslint-disable-next-line
		console.log('axios request interceptor!');
		axiosInstance.defaults.headers['X-CSRFToken'] = csrftoken;
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
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	},
);

export default axiosInstance;
