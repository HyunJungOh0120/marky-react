const axios = require('axios');

// const BASE_HOST = process.env.BASE_HOST || 'http://localhost:8000';
// baseURL: `${BASE_HOST}/api`,
const axiosInstance = axios.create({
	baseURL: `/api`,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': '',
		Authorization: '',
		accept: 'application/json',
	},
});

export default axiosInstance;
