import React, { useContext, createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import parseJwt from './utils/parseJwt';

const MainContext = createContext();

const accessToken = localStorage.getItem('access_token');

const initialState = Object.freeze({
	isAuthenticated: accessToken !== null,
	userId: accessToken !== null ? parseJwt(accessToken).user_id : '',
});

const actions = {
	SIGNIN: 'SIGNIN',
	SIGNOUT: 'SIGNOUT',
};

const mainReducer = (state, action) => {
	switch (action.type) {
		case actions.SIGNIN:
			localStorage.setItem('access_token', action.payload.accessToken);

			return {
				...state,
				isAuthenticated: true,
			};
		case actions.SIGNOUT:
			localStorage.removeItem('access_token');
			return {
				...state,
				isAuthenticated: false,
				userId: '',
			};

		default:
			return state;
	}
};

const MainProvider = ({ children }) => {
	const [mainState, mainDispatch] = useReducer(mainReducer, initialState);

	const value = { mainState, mainDispatch };

	return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMain = () => {
	const context = useContext(MainContext);
	if (context === undefined) {
		throw new Error('💥 Context should be used within Context Provider');
	}
	return context;
};

export { MainProvider, useMain, actions };

MainProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
