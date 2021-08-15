const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (error) {
		return null;
	}
};

export default parseJwt;
